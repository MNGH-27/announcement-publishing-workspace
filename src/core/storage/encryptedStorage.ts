import type { StateStorage } from 'zustand/middleware'

const keyName = 'announcement-workspace:encryption-key'

let keyPromise: Promise<CryptoKey> | undefined

const encode = (bytes: Uint8Array) =>
  btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(''))
const decode = (value: string) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0))

async function getKey() {
  if (!keyPromise)
    keyPromise = (async () => {
      let saved = localStorage.getItem(keyName)
      if (!saved) {
        saved = encode(crypto.getRandomValues(new Uint8Array(32)))
        localStorage.setItem(keyName, saved)
      }
      return crypto.subtle.importKey('raw', decode(saved), 'AES-GCM', false, ['encrypt', 'decrypt'])
    })()
  return keyPromise
}

let writes = Promise.resolve()

export const encryptedStorage: StateStorage = {
  async getItem(name) {
    await writes
    const saved = localStorage.getItem(name)
    if (!saved) return null
    const { iv, data } = JSON.parse(saved)
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: decode(iv) },
      await getKey(),
      decode(data),
    )
    return new TextDecoder().decode(plain)
  },
  setItem(name, value) {
    const write = writes
      .catch(() => {})
      .then(async () => {
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const data = await crypto.subtle.encrypt(
          { name: 'AES-GCM', iv },
          await getKey(),
          new TextEncoder().encode(value),
        )
        localStorage.setItem(
          name,
          JSON.stringify({ iv: encode(iv), data: encode(new Uint8Array(data)) }),
        )
      })
    writes = write
    return write
  },
  async removeItem(name) {
    await writes.catch(() => {})
    localStorage.removeItem(name)
  },
}

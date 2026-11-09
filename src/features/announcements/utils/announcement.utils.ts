import type { PublicationOperation } from "../../../mocks"

/** Returns the newest attempt without changing the source array.
 * For equal timestamps, the later array entry wins; duplicate snapshots
 * of the same operation prefer the higher version.
 */
export function findAnnouncementOperation(
  operations: readonly PublicationOperation[],
  announcementId: string | undefined,
): PublicationOperation | undefined {
  if (!announcementId) return undefined
  return operations.reduce<PublicationOperation | undefined>((latest, operation) => {
    if (operation.announcementId !== announcementId) return latest
    if (!latest) return operation
    if (operation.operationId === latest.operationId) {
      return operation.version >= latest.version ? operation : latest
    }
    return Date.parse(operation.createdAt) >= Date.parse(latest.createdAt) ? operation : latest
  }, undefined)
}

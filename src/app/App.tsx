import { Toaster } from 'sonner'
import { AnnouncementWorkspace } from '../features/announcements'
import { Layout } from './layout/Layout'

export default function App() {
  return (
    <Layout>
      <AnnouncementWorkspace />
      <Toaster position="top-right" richColors closeButton />
    </Layout>
  )
}

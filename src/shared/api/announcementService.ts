import { createAnnouncementMock } from '../../mocks'

// Share one service client across features. Read publication truth through its API.
export const announcementService = createAnnouncementMock()

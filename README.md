# Announcement Publishing Workspace

## Overview

Build a small announcement publishing workspace using **React and TypeScript**.

Create the application from scratch for a communications team with three announcements
ready to publish. Users select prepared content, submit it to a publishing service,
and follow the result.

Publishing means making an announcement publicly available through that service.
For this assignment the service is simulated; you do not need to deploy a public
announcement website. The content is already written, so this is not an editor or CMS.

Publication can take time. A service request may fail even though the announcement
is still being processed or has already been published. The workspace must let users
continue their work, understand the available information, and recover safely.

## 1. Announcements

Display these three announcements in a list or equivalent interface. The supplied
`getAnnouncements()` method returns their IDs, titles, and complete prepared content.

| ID        | Title                      | Prepared content                                                                                                                                   |
| --------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ann-101` | Service Maintenance Notice | Our online services will be briefly unavailable during the scheduled maintenance window. We appreciate your patience while we improve reliability. |
| `ann-102` | New Feature Launch         | The new workspace search is ready. Customers can find their saved items using the updated search experience in their account.                      |
| `ann-103` | Support Hours Update       | Our support team has updated its availability. Please consult the support page for the latest hours before contacting the team.                    |

- Let users select an announcement, read its prepared content, and see its publication state.
- Keep each announcement's publication information independent of the current selection.
- Let users return to an announcement to follow its existing publication attempt.

The list and content are fixed. Do not implement creation, editing, or deletion.
A clear, usable interface is sufficient; elaborate visual design is not required.

## 2. Publication Workflow

### Starting and Following Publications

Allow users to publish a selected announcement through the supplied service.

- Give understandable feedback while a request is underway and while publication is processing.
- Let users switch announcements and publish another one before the earlier operation finishes.
- Show publication outcomes against the correct announcement, regardless of selection changes
  or the order in which requests finish.
- Provide a way to obtain updated publication information. User-initiated checks,
  automatic updates, or a combination are acceptable.

The interface must distinguish these situations; the wording and presentation are up to you:

| Situation                             | What the user should understand                                                              |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| No publication started                | This announcement has not been submitted yet.                                                |
| `processing`                          | The service has accepted an operation but publication is not finished.                       |
| `published`                           | The service has confirmed successful publication.                                            |
| `rejected`                            | The service has declined publication and supplied a reason.                                  |
| Request failed or outcome unconfirmed | Communication failed; this alone does not establish whether publication succeeded or failed. |

The unconfirmed situation is a user-facing condition, not another service status.
A request error must not erase an already confirmed publication result or make the
other announcements unusable. Information displayed later must remain consistent
when responses are delayed or arrive out of order.

### Failures and Safe Recovery

- Show explicit rejections with the available reason.
- When a response is lost, let users obtain the outcome of the existing operation
  or safely repeat that attempt without creating an unintended duplicate publication.
- If a status request temporarily fails, keep a usable way to obtain an updated result.
  A failed status check does not mean the announcement was rejected.
- Keep recovery actions associated with the announcement and operation they concern.

An operation ID identifies one logical attempt. Reusing that ID for the same
announcement refers to the existing operation; choosing a different ID creates
another attempt. The service does not deduplicate different operation IDs merely
because they reference the same announcement.

Each announcement only needs one successful publication. A deliberate new attempt
after a confirmed rejection is allowed; intentional republication after success
is outside scope. Reusing the ID of a rejected operation still returns its rejection.

### Recovery After Refresh

Refreshing the page in the same browser tab must not lose the ability to recover
existing publication work or silently start new publications. Restore the workspace's
publication information through the public service APIs and allow unresolved work
to be followed until its outcome is known. Restoring the selected announcement is optional.

The simulator preserves its service records independently of the application's own
view state. You may make reasonable product and technical assumptions where behavior
is unspecified; briefly document them. No particular frontend persistence approach
or status-refresh strategy is required.

## 3. Integration

Copy the supplied `mocks/` directory into your source tree and import from
`mocks/index.ts`. Use the supplied mocks unchanged. They are framework-independent
and require no external backend, installed mock dependency, or server setup.
Run the application in a browser with normal session storage available.

```ts
import { createAnnouncementMock } from './mocks'

const service = createAnnouncementMock()
const announcements = await service.getAnnouncements()
const operation = await service.publish('ann-101', 'example-operation')
const status = await service.getStatus(operation.operationId)
const recordedOperations = await service.listOperations()
```

### Public API

`createAnnouncementMock(): IAnnouncementService` creates a service client. The
methods below belong to that client.

| Method                                                 | Return type                             | Description                                                                                |
| ------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------ |
| `getAnnouncements()`                                   | `Promise<IAnnouncement[]>`              | Returns the three prepared announcements.                                                  |
| `publish(announcementId: string, operationId: string)` | `Promise<PublicationOperation>`         | Starts an operation or returns a current snapshot of the same operation.                   |
| `getStatus(operationId: string)`                       | `Promise<PublicationOperation \| null>` | Returns an operation snapshot; null means the ID is not recorded.                          |
| `listOperations()`                                     | `Promise<PublicationOperation[]>`       | Returns all recorded operations, including unresolved work, for status reads and recovery. |
| `setScenario(scenario: AnnouncementScenario)`          | `void`                                  | Selects the scenario for new operations; development utility.                              |
| `getScenario()`                                        | `AnnouncementScenario`                  | Returns the selected scenario; development utility.                                        |
| `reset()`                                              | `void`                                  | Clears simulated service records and restores the default scenario; development utility.   |

IDs are exact, nonblank strings of at most 100 characters. An operation ID belongs
to one announcement. Using it for another announcement rejects with `OPERATION_ID_CONFLICT`.
Repeated publication of the same operation does not restart it and may return a
still-processing result. Rejected operations are returned as data, not thrown as
transport errors; their terminal outcome does not change.

Snapshots describe the operation when the method was called and may be delivered
later. For one operation, version 1 is processing and version 2 is terminal.

### Simulation Scenarios

`ANNOUNCEMENT_SCENARIOS` exports these names. The default is `success`.

| Scenario               | Supported behavior                                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `success`              | Publication processes and then succeeds.                                                                                    |
| `explicit-rejection`   | The service records a rejection with a reason.                                                                              |
| `lost-response`        | Publication continues, but the first publish response is lost.                                                              |
| `status-check-failure` | The first publish response is lost and the first status read for that operation temporarily fails.                          |
| `overlapping`          | Announcements have different publication and response durations, allowing responses and completions to arrive out of order. |
| `slow-response`        | The initial publish response is delayed; publication can finish before it arrives.                                          |

A scenario applies to new operations, not those already recorded. Publication
progress depends on elapsed time, not the number of status requests. The mock
does not update frontend views automatically.

A status read means either `getStatus()` or `listOperations()`. In
`status-check-failure`, the first such read for each operation rejects with
`STATUS_UNAVAILABLE`. A failing list request consumes one pending failure, so
several operations can cause several successive list requests to fail. The
publication continues independently of those request failures.

Scenario controls are not sources of publication truth. Use the public operation
methods to determine outcomes. Development-only scenario controls may be included,
but are not a required product feature.

### Essential TypeScript Contracts

All public definitions are exported through `mocks/index.ts`; full contracts are in
[`mocks/contracts.ts`](mocks/contracts.ts).

```ts
interface IAnnouncement {
  id: string
  title: string
  body: string
}

type PublicationOperation = {
  operationId: string
  announcementId: string
  createdAt: string
} & (
  | { status: 'processing'; version: 1 }
  | { status: 'published'; version: 2; publicationId: string; publishedAt: string }
  | { status: 'rejected'; version: 2; reason: string }
)
```

Timestamp fields are ISO strings. `AnnouncementScenario` is the union of scenario
names above. `AnnouncementMockError` exposes `code`, `requestId`, and optional
`operationId` and `announcementId`. Codes are `RESPONSE_LOST`, `STATUS_UNAVAILABLE`,
`UNKNOWN_ANNOUNCEMENT`, and `OPERATION_ID_CONFLICT`. Invalid ID arguments reject
with `TypeError`; invalid scenario names throw `RangeError`.

### Service Records and Browser Scope

Service records, operation-ID idempotency, scenario configuration, and consumed
transient failures survive refresh and new client instances on the same origin/tab.
They are held in mock-owned session storage, separately from frontend-owned state.
Use `listOperations()` and `getStatus()` for recovery; storage contents and mock
implementation internals are not supported sources of application truth.

Closing the tab, clearing browser storage, or calling `reset()` ends the service's
persistence guarantee. Reset affects all service instances in that context. It does
not cancel previously returned promises: older captured responses can still arrive,
but their delivery cannot recreate or change reset service records. A product reset
control is not required. Cross-tab, cross-device, and offline behavior are outside scope.

## 4. Deliverables

1. Create your own GitHub repository for the assignment and commit your work regularly.
2. Include the complete application source code and the supplied, unchanged mocks.
3. Include a README with installation and run instructions, technical decisions,
   assumptions, and known limitations. Include any commands needed to run checks you add.
4. Submit the GitHub repository link to the hiring team when complete.

No real backend, authentication, announcement editor, content creation, bulk publishing,
advanced monitoring dashboard, or deployment setup is required. Automated tests are
optional; prioritize reliable core behavior and a clear, usable application.

## 5. Working Guidelines

Prioritize correctness and understandable behavior over additional features or
elaborate styling. Make reasonable assumptions where requirements leave a choice,
and explain those decisions briefly. If something remains incomplete, describe
what is missing and how you would approach it.

AI assistants are permitted. Documentation and other development tools may also be used.

## Application structure

The application uses feature-oriented folders:

```text
src/
  app/                      # App composition and global styles
  features/
    announcements/          # Announcement selection and prepared content
      components/
      index.ts              # Public feature exports
    publication/            # Publication operations and recovery (to implement)
  shared/
    api/                    # Shared service client
    assets/                 # Shared static assets
  mocks/                    # Unchanged copy of the supplied service
  main.tsx                  # Browser entry point
```

Keep feature-specific components, hooks, and state together inside their feature.
Create subfolders when needed. Import another feature through its public index.ts;
shared code must not depend on features. The app layer composes features. The original
mocks directory is retained as the reference copy; application imports use src/mocks.
The current screen is a placeholder; publication behavior is not implemented yet.

### Local development

Use Node.js 24 and npm. Run `npm ci`, then `npm run dev`.
Run `npm run build` for TypeScript validation and a production build, and
`npm run lint` for lint checks. Use `npm run preview` to preview a production build.

### Code formatting

Run `npm run format` to format project files with Prettier, or
`npm run format:check` to check formatting without changing files.
The supplied `mocks/` and `src/mocks/` directories are excluded to preserve them
unchanged. Generated files and the dependency lockfile are also excluded.

import type { RouteRecordRaw } from 'vue-router'

import { route as dashboardRoute } from './dashboard'
// import { route as chatRoute } from './chat'
// import { route as editorRoute } from './editor'
// import { route as historyRoute } from './history'
// import { route as projectRoute } from './project'
import { route as documentsRoute } from './documents'
// import { route as settingsRoute } from './settings'
// import { route as templatesRoute } from './templates'
// import { route as UIKitRoute } from './ui-kit'
import { route as notFoundRoute } from './not-found'

export const routes: readonly RouteRecordRaw[] = [
  dashboardRoute,
  // chatRoute,
  // editorRoute,
  // historyRoute,
  // projectRoute,
  documentsRoute,
  // settingsRoute,
  // templatesRoute,
  // UIKitRoute,
  notFoundRoute
] as const

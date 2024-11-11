import type { RouteRecordRaw } from 'vue-router'

import { route as loginRoute } from './login'
import { route as dashboardRoute } from './dashboard'
import { route as chatRoute } from './chat'
import { route as historyRoute } from './history'
import { route as documentRoute } from './document'
import { route as documentsRoute } from './documents'
import { route as profileRoute } from './profile'
import { route as settingsRoute } from './settings'
import { route as templatesRoute } from './templates'
import { route as UIKitRoute } from './ui-kit'
import { route as notFoundRoute } from './not-found'

export const routes: readonly RouteRecordRaw[] = [
  loginRoute,
  dashboardRoute,
  profileRoute,
  chatRoute,
  historyRoute,
  documentRoute,
  documentsRoute,
  settingsRoute,
  templatesRoute,
  UIKitRoute,
  notFoundRoute
] as const

import { routeName as login } from './routes/login'
import { routeName as signup } from './routes/signup'
import { routeName as dashboard } from './routes/dashboard'
import { routeName as documents } from './routes/documents'
import { routeName as document } from './routes/document'
import { routeName as chat } from './routes/chat'
import { routeName as templates } from './routes/templates'
import { routeName as history } from './routes/history'
import { routeName as profile } from './routes/profile'
import { routeName as settings } from './routes/settings'
import { routeName as UIKit } from './routes/ui-kit'
import { routeName as notFound } from './routes/not-found'

export const pages = {
  login,
  signup,
  dashboard,
  documents,
  document,
  chat,
  templates,
  history,
  profile,
  settings,
  UIKit,
  notFound
} as const

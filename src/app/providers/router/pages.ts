import { routeName as dashboard } from './routes/dashboard'
import { routeName as projects } from './routes/projects'
import { routeName as project } from './routes/project'
import { routeName as chat } from './routes/chat'
import { routeName as editor } from './routes/editor'
import { routeName as templates } from './routes/templates'
import { routeName as history } from './routes/history'
import { routeName as profile } from './routes/profile'
import { routeName as settings } from './routes/settings'
import { routeName as UIKit } from './routes/ui-kit'
// import { routeName as notFound } from './routes/not-found'

export const pages = {
  dashboard
  // projects,
  // project,
  // chat,
  // editor,
  // templates,
  // history,
  // profile,
  // settings,
  // UIKit,
  // notFound
} as const

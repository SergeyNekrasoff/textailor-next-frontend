import type { DocumentResponseData } from '@/modules/documents/types'
import mitt from 'mitt'

type Events = {
  DOCUMENT_ENTITY: DocumentResponseData
}

const eventBus = mitt<Events>()

export type { Events }
export default eventBus

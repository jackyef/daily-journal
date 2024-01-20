import { renderCalendar } from './calendar'
import { renderCsvButton } from './csvButton'
import { renderEditor } from './editor'
import { Store, initStore } from './lib'
import './style.css'

const rerender = (store: Store) => {
  console.log('rerender', store)
  
  renderCalendar({ store })
  renderEditor({ store })
  renderCsvButton({ store })
}

const store = initStore(rerender)

rerender(store)

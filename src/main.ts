import { renderCalendar } from './calendar'
import { renderEditor } from './editor'
import { Store, initStore } from './lib'
import './style.css'

const rerender = (store: Store) => {
  console.log('rerender', store)
  renderCalendar({
    shownDate: new Date(),
    store
  })

  renderEditor({
    store
  })
}

const store = initStore(rerender)
rerender(store)

import { editor } from "./constants"
import { Store } from "./lib"

type Props = {
  store: Store
}

export const renderEditor = ({ store }: Props) => {
  // Read data from store for existing note
  editor.value = store.getNoteForSelectedDate() // TODO: get data from storage

  console.log('editor')

  editor.addEventListener('input', () => {
    store.setNoteForSelectedDate(editor.value)
  })
}

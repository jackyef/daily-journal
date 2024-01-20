import { clearNoteButton, editor } from "./constants"
import { Store } from "./lib"

type Props = {
  store: Store
}

export const renderEditor = ({ store }: Props) => {
  editor.value = store.getNoteForSelectedDate()

  editor.addEventListener('input', () => {
    store.setNoteForSelectedDate(editor.value)
  })
  
  clearNoteButton.onclick = () => {
    store.clearNoteForSelectedDate()
  }
}

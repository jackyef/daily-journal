const today = new Date()
today.setHours(0)
today.setMinutes(0)
today.setSeconds(0)
today.setMilliseconds(0)

type RenderFunction = (store: Store) => void

const storageKey = '__persistedNotes'
const getPersistedNotes = () => {
  try {
    const storedNotes = localStorage.getItem(storageKey)
    
    if (storedNotes) {
      return JSON.parse(storedNotes)
    }

    return {}
  } catch {
    return {}
  }
}

const getKeyFromDate = (date: Date) => {
  return Number(date)
}

export const initStore = (renderFn: RenderFunction) => (() => {
  const state = {
    shownDate: today,
    selectedDate: today,
    notes: getPersistedNotes() as Record<number, string> // Record<timestamp, Note>
  }

  // TODO: Move to IndexedDB
  // Avoid loading every notes for all dates at once
  const persistToStorage = () => {
    localStorage.setItem(storageKey, JSON.stringify(state.notes))
  }

  const actions = {
    setSelectedDate: (date: Date) => {
      state.selectedDate = date

      rerender()
    },
    showNextMonth: () => {
      const newMonth = new Date(state.shownDate)
      newMonth.setMonth(newMonth.getMonth() + 1)
      state.shownDate = newMonth

      rerender()
    },
    showPreviousMonth: () => {
      const newMonth = new Date(state.shownDate)
      newMonth.setMonth(newMonth.getMonth() - 1)
      state.shownDate = newMonth

      rerender()
    },
    showNextYear: () => {
      const newMonth = new Date(state.shownDate)
      newMonth.setFullYear(newMonth.getFullYear() + 1)
      state.shownDate = newMonth

      rerender()
    },
    showPreviousYear: () => {
      const newMonth = new Date(state.shownDate)
      newMonth.setFullYear(newMonth.getFullYear() - 1)
      state.shownDate = newMonth

      rerender()
    },
    getNote: (date: Date) => {
      return state.notes[getKeyFromDate(date)]
    },
    setNoteForSelectedDate: (note: string) => {
      state.notes[getKeyFromDate(state.selectedDate)] = note
      persistToStorage()
    },
    clearNoteForSelectedDate: () => {
      state.notes[getKeyFromDate(state.selectedDate)] = ''
      persistToStorage()
      rerender()
    },
    getNoteForSelectedDate: () => {
      return state.notes[Number(state.selectedDate)] ?? ''
    }
  }

  const rerender = () => {
    renderFn({
      ...state,
      ...actions,
    })
  }

  return {
    ...state,
    ...actions,
  }
})()

export type Store = ReturnType<typeof initStore>

const today = new Date()
today.setHours(0)
today.setMinutes(0)
today.setSeconds(0)
today.setMilliseconds(0)

type RenderFunction = (store: Store) => void

export const initStore = (renderFn: RenderFunction) => (() => {
  const state = {
    shownDate: today,
    selectedDate: today,
    notes: {} as Record<number, string> // Record<timestamp, Note>
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
    setNoteForSelectedDate: (note: string) => {
      state.notes[Number(state.selectedDate)] = note
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

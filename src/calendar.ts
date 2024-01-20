import { Weekday, currentMonth, dates, nextMonthButton, nextYearButton, prevMonthButton, prevYearButton, weekdays } from './constants'
import { Store } from './lib'
import { monthFormatter } from './utils'

type CalendarProps = {
  store: Store
}

type BuildDateButtonOptions = {
  button: HTMLButtonElement
  date: Date
  store: Store
}

const buildDateButton = ({ button, date, store }: BuildDateButtonOptions) => {
  button.innerText = String(date.getDate())

  const shownMonth = store.shownDate.getMonth()
  const note = store.getNote(date)

  if (Number(date) === Number(store.selectedDate)) {
    button.setAttribute('aria-selected', 'true')
  }

  if (note) {
    button.setAttribute('data-hasnote', 'true')
  }

  if (shownMonth !== date.getMonth()) {
    button.setAttribute('class', 'differentMonth')
  }

  button.onclick = () => {
    store.setSelectedDate(date)
  }

  return button
}

export const renderCalendar = ({ store }: CalendarProps) => {
  // Unmount previous render
  dates.innerHTML = ''

  // Calendar header
  const { shownDate } = store
  const calendarMonth = monthFormatter.format(shownDate)
  currentMonth.innerText = calendarMonth

  // Listeners for next/prev month buttons
  prevMonthButton.removeEventListener('click', store.showPreviousMonth)
  nextMonthButton.removeEventListener('click', store.showNextMonth)
  prevYearButton.removeEventListener('click', store.showPreviousYear)
  nextYearButton.removeEventListener('click', store.showNextYear)

  prevMonthButton.addEventListener('click', store.showPreviousMonth)
  nextMonthButton.addEventListener('click', store.showNextMonth)
  prevYearButton.addEventListener('click', store.showPreviousYear)
  nextYearButton.addEventListener('click', store.showNextYear)

  // Dates
  const startOfMonth = new Date(shownDate)
  startOfMonth.setDate(1)
  const startOfNextMonth = new Date(shownDate)
  startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1)
  startOfNextMonth.setDate(1)
  
  let curr = new Date(startOfMonth)

  const firstWeekdayOfMonth = curr.toLocaleString('default', {
    weekday: 'short'
  }) as Weekday

  const numberOfDaysToBackfill = weekdays.indexOf(firstWeekdayOfMonth)
  const backfilledDayButtons = [] as HTMLButtonElement[]

  Array.from({ length: numberOfDaysToBackfill }).forEach((_, index) => {
    const offset = index + 1
    const date = new Date(startOfMonth)
    date.setDate(date.getDate() - offset)

    const button = buildDateButton({
      button: document.createElement('button'),
      date,
      store
    })

    backfilledDayButtons.unshift(button)
  })

  while (curr < startOfNextMonth) {
    const row = document.createElement('div')
    row.setAttribute('class', 'datesRow')

    while (backfilledDayButtons.length > 0) {
      const button = backfilledDayButtons.shift()

      if (button) {
        row.appendChild(button)
      }
    }

    weekdays.forEach(weekday => {
      const weekdayName = curr.toLocaleString('default', {
        weekday: 'short'
      })
      const button = document.createElement('button')

      if (weekdayName === weekday) {
        buildDateButton({ button, date: new Date(curr), store })
        row.appendChild(button)

        curr.setDate(curr.getDate() + 1)
      }
    })

    dates.appendChild(row)
  }
}

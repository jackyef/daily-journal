import { currentMonth, dates, nextMonthButton, nextYearButton, prevMonthButton, prevYearButton, weekdays } from './constants'
import { Store } from './lib'
import { monthFormatter } from './utils'

type CalendarProps = {
  store: Store
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

  while (curr < startOfNextMonth) {
    const row = document.createElement('div')
    row.setAttribute('class', 'datesRow')

    weekdays.forEach(weekday => {
      const weekdayName = curr.toLocaleString('default', {
        weekday: 'short'
      })
      const button = document.createElement('button')

      if (curr >= startOfMonth) {
        button.innerText = ' '
      }

      if (weekdayName === weekday) {
        button.innerText = String(curr.getDate())
        curr.setDate(curr.getDate() + 1)

        const thisDate = new Date(curr)
        button.onclick = () => {
          store.setSelectedDate(thisDate)
        }
      } else {
        button.innerText = ' '
      }

      if (Number(curr) === Number(store.selectedDate)) {
        button.setAttribute('class', 'isSelected')
      }

      row.appendChild(button)
    })

    dates.appendChild(row)
  }
}

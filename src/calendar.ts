import { currentMonth, dates, weekdays } from './constants'
import { Store } from './lib'
import { monthFormatter } from './utils'

type CalendarProps = {
  shownDate: Date
  store: Store
}

export const renderCalendar = ({ shownDate, store }: CalendarProps) => {
  // Unmount previous render
  dates.innerHTML = ''

  // Calendar header
  const calendarMonth = monthFormatter.format(shownDate)
  currentMonth.innerText = calendarMonth

  // Dates
  const startOfMonth = new Date(`${shownDate.getFullYear()}-${shownDate.getMonth() + 1}-01`)
  const startOfNextMonth = new Date(`${shownDate.getFullYear()}-${shownDate.getMonth() + 2}-01`)

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

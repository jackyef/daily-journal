import { downloadCsvButton } from "./constants"
import { Store } from "./lib"

type Props = {
  store: Store
}

export const renderCsvButton = ({ store }: Props) => {
  downloadCsvButton.onclick = () => {
    let csvContent = ""
    const rows = [['date','note'].join(',')]

    Object.keys(store.notes).forEach((timestamp) => {
      const date = new Date(Number(timestamp))

      rows.push([`"${date.toLocaleString('default', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })}"`, store.getNote(date)].join(','))
    })

    csvContent += rows.join('\n')

    const blob = new Blob([csvContent], { type: 'data:text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const anchor = document.createElement('a')
    anchor.download = 'daily_notes.csv'
    anchor.href = url
    anchor.click()
  }
}

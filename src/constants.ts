export const calendar = document.getElementById('calendar') as HTMLDivElement
export const editor = document.querySelector('#editor textarea') as HTMLTextAreaElement
export const dates = document.querySelector('#calendar .dates') as HTMLDivElement
export const currentMonth = document.querySelector('#calendar .currentMonth') as HTMLDivElement

export const weekdays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
] as const

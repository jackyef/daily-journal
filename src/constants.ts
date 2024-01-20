export const calendar = document.getElementById('calendar') as HTMLDivElement
export const editor = document.querySelector('#editor textarea') as HTMLTextAreaElement
export const dates = document.querySelector('#calendar .dates') as HTMLDivElement
export const currentMonth = document.querySelector('#calendar .currentMonth') as HTMLDivElement
export const prevMonthButton = document.getElementById('prevMonth') as HTMLButtonElement
export const nextMonthButton = document.getElementById('nextMonth') as HTMLButtonElement
export const prevYearButton = document.getElementById('prevYear') as HTMLButtonElement
export const nextYearButton = document.getElementById('nextYear') as HTMLButtonElement
export const clearNoteButton = document.getElementById('clearNote') as HTMLButtonElement

export const weekdays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
] as const

export type Weekday = typeof weekdays[number]

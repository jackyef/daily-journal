export const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric' 
})

export const getNumberOfDaysBetween = (date1: Date, date2: Date) => {
  return (Number(date2) - Number(date1)) / (24 * 60 * 60 * 1000)
}

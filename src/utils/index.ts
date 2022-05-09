/**
 * This is a function that ensures the return of JST dates
 * in environments where Date returns either UTC or JST.
 * @returns {Date} The current JST Date
 */
export const getJstTime = () => {
  const jstOffsetMinutes = 9 * 60
  const millisecondsInMinute = 60 * 1000

  // UTC: (   0 + jstOffsetMinutes) * millisecondsInMinute = 32400000
  // JST: (-540 + jstOffsetMinutes) * millisecondsInMinute = 0
  const differenceFromJST = () =>
    (new Date().getTimezoneOffset() + jstOffsetMinutes) * millisecondsInMinute

  // UTC time + 32400000 -> JST time
  // JST time +        0 -> JST time
  return new Date(Date.now() + differenceFromJST())
}

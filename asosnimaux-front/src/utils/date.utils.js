export const setToLocalDate = (date) => {
  const dbDate = new Date(date);
  const newDate = dbDate.toLocaleDateString();
  return newDate;
}
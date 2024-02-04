export const setToLocalDate = (date) => {
  const dbDate = new Date(date);
  const newDate = dbDate.toLocaleDateString();
  return newDate;
}

export const setToLocalDateLong = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  const dbDate = new Date(date);
  const newDate = dbDate.toLocaleDateString(undefined, options);
  const firstLetterUpper = newDate[0].toUpperCase();

  const capitalizedDate = newDate.replace(newDate[0], firstLetterUpper);

  return capitalizedDate;
}


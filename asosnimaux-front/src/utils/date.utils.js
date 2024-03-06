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

export const setToYYYYMMDD = (date) => {
  const dbDate = new Date(date);

  const year = dbDate.getFullYear();
  const month = (dbDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const day = dbDate.getDate().toString().padStart(2, '0');

  const newDate = `${year}-${month}-${day}`;

  return newDate;
}

export const setMinMaxDate = (operator, number) => {
  const currentDate = new Date();

  switch (operator) {
    case '+':
      currentDate.setDate(currentDate.getDate() + number);
      break;

    case '-':
      currentDate.setDate(currentDate.getDate() - number);
      break;

    default:
      throw new Error("Invalid operator : use '+' or '-'");
  }

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  const newDate = `${year}-${month}-${day}`;

  return newDate;
}
export const getDuplicateErrorMessage = (error, elements) => {
  const duplicateError = elements.find(({ element }) => error.includes("Duplicate") && error.includes(element));
  return duplicateError ? duplicateError.message : error;
}
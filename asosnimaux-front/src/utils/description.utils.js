export const formatDescription = (text) => {
  const splitted = text?.split(/\r\n|\n/);

  return splitted?.filter(p => p !== "");
}
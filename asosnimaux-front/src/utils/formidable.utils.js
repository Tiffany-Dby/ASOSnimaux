export const setFormData = form => {
  const fd = new FormData();
  const keys = Object.keys(form);

  for (let key of keys) {
    fd.append(key, form[key]);
  }

  return fd;
}
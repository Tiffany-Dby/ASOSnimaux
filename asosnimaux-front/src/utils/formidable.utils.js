export const setFormData_ = (form, fileKey = "newArticleImg") => {
  const fd = new FormData();
  const keys = Object.keys(form);

  for (let key of keys) {
    if (key !== fileKey) {
      fd.append(key, form[key]);
    }
  }

  // Handle the file separately
  if (form[fileKey]) {
    fd.append(fileKey, form[fileKey]);
  }

  return fd;
}

export const setFormData = form => {
  const fd = new FormData();
  const keys = Object.keys(form);

  for (let key of keys) {
    fd.append(key, form[key]);
  }

  return fd;
}
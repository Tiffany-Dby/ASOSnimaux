export const setFormData = form => {
  const fd = new FormData();
  const keys = Object.keys(form);

  for (let key of keys) {
    fd.append(key, form[key]);
  }

  return fd;
}

export const formatArticle = (article) => {
  const formattedArticle = {
    articleID: article.id
  }

  return formattedArticle;
}

export const getSizeInMb = (file) => {
  const sizeInMb = file.size / (1024 * 1024);

  return sizeInMb;
}
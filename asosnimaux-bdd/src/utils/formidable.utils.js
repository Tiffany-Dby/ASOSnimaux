export const setImgUrl = (filePath, folderName) => {
  const formatPath = filePath.replace(/\\/g, '/');
  const indexOfFolderName = formatPath.indexOf(folderName);

  const slicedPath = formatPath.slice(indexOfFolderName);
  return slicedPath;
}

export const setDeleteImgUrl = oldFilePath => {
  return `./public/${oldFilePath}`;
}
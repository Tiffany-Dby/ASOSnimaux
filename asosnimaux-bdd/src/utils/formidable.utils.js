import { unlink } from "node:fs/promises";

export const setImgUrl = (filePath, folderName) => {
  const formatPath = filePath.replace(/\\/g, '/');
  const indexOfFolderName = formatPath.indexOf(folderName);

  const slicedPath = formatPath.slice(indexOfFolderName);
  return slicedPath;
}

export const setDeleteImgUrl = oldFilePath => {
  return `./public/${oldFilePath}`;
}

export const deleteImg = async (imgPathResult) => {
  let error = null;
  try {
    const PicturePath = setDeleteImgUrl(imgPathResult[0].picture_url)
    const r = await unlink(PicturePath);
    console.log(`${PicturePath} was successfully deleted`);
  }
  catch (e) {
    console.log("delete e.message : ", e.message);
    error = e.message;
  }
  finally {
    return error;
  }
}
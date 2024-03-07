import formidable from "formidable";
import { unlink } from "node:fs/promises";

export const getFormidableForm = async (folderName, maxMb, req) => {
  const form = formidable({
    uploadDir: `./public/${folderName}`,
    keepExtensions: true,
    createDirsFromUploads: true,
    maxFileSize: maxMb * 1024 * 1024,
    filter: opts => {
      const { mimetype } = opts;
      return mimetype === "image/png" || mimetype === "image/jpg" || mimetype === "image/jpeg" || mimetype === "image/webp";
    }
  });

  let fields = null;
  let files = null;
  let error = null;

  try {
    [fields, files] = await form.parse(req);
  }
  catch (err) {
    console.log("Error parsing form :", err.message);
    error = err.message;
  }
  finally {
    return { fields, files, error }
  }
}

export const deleteImgs = async (newFilePath, oldFilePath, folderName) => {
  const newErr = await deleteImg(newFilePath);
  const oldErr = await deleteImg(setImgUrl(oldFilePath, folderName));

  return { newErr, oldErr };
};

export const setImgUrl = (filePath, folderName) => {
  const formatPath = filePath.replace(/\\/g, '/');
  const indexOfFolderName = formatPath.indexOf(folderName);

  const slicedPath = formatPath.slice(indexOfFolderName);
  return slicedPath;
}

export const setDeleteImgUrl = oldFilePath => {
  return `./public/${oldFilePath}`;
}

export const deleteImg = async (imgPath) => {
  let error = null;
  try {
    const PicturePath = setDeleteImgUrl(imgPath)
    const r = await unlink(PicturePath);
    console.log(`${PicturePath} was successfully deleted`);
  }
  catch (e) {
    console.log("Error deleting image : ", e.message);
    error = e.message;
  }
  finally {
    return error;
  }
}
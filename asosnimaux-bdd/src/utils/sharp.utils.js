import sharp from "sharp";
import { setImgUrl } from "./formidable.utils.js";

export const resizeAndFormatImg = async (filePath, folderName, format, width, height) => {
  let error = null;
  let result = [];

  try {
    const newFilePath = filePath.replace(/\.[^/]*$/, `.${format}`);

    await sharp(filePath).resize({ width: width, height: height }).toFormat(format).toFile(newFilePath);

    sharp.cache(false);

    result = setImgUrl(newFilePath, folderName);
  }
  catch (err) {
    console.error("Error processing image:", err);
    error = err.message;
  }
  finally {
    return { result, error };
  }
}
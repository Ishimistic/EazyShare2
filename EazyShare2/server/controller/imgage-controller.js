import File from "../models/file.js";
// import { ErrorCaptureStackTrace } from 'node:internal/errors';

export const uploadImage = async (req, res) => {
  // console.log(req);
  const fileObj = {
    path: req.file.path,
    name: req.file.originalname,
  };
  try {
    const file = await File.create(fileObj);
    console.log(file);
    console.log("File id: ", file._id);
    res.status(200).json({ path: `http://localhost:${process.env.PORT}/file/${file._id}` });
  } catch (err) {
    console.log("Error: ", err.msg);
    res.status(500).json({ err: err.msg });
  }
};

export const downloadImage = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    file.downloadCount += 1;
    await file.save();

    res.download(file.path, file.name, (err) => {
      if (err) {
        console.log("Error during file download: ", err.message);
        return res.status(500).json({ err: err.message });
        // ErrorCaptureStackTrace(err);
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ err: err.message });
  }
};

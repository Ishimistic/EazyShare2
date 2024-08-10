import express from "express";
// import {uploadImage, getImage} from "../controller/imgage-controller.js";
import upload from "../utils/upload.js";
import {uploadImage, downloadImage} from "../controller/imgage-controller.js";

const router = express.Router();

router.post("/upload", upload.single('file'), uploadImage);
router.get('/file/:fileId', downloadImage);
export default router;
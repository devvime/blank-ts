import multer from "multer";
import uploadConfig from "@common/config/multer.config";

export const upload = multer(uploadConfig.upload("../tmp"));
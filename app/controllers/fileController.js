import { uploadSingleFileService,getReadFileService,deleteFileService } from "../Service/file.js";

export const uploadSingleFile = async (req, res) => {
  let result = await uploadSingleFileService(req);
  return res.status(200).json(result);
};
export const readfile = async (req, res) => {
  let result = getReadFileService(req, res);
  return res.sendFile(result);
};

export const deleteSingleFile =  (req, res) => {
    let result = deleteFileService(req,res);
    return res.json(result);
    
  };


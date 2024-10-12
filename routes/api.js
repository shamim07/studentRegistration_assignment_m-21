
import express from 'express';
const router = express.Router();
import * as UsersController from "../app/controllers/UsersController.js";
import * as fileController from "../app/controllers/fileController.js"
import { AuthVerification } from '../app/middleware/authVerification.js';

// Users
router.post("/Registration", UsersController.register)
router.post("/Login", UsersController.login)
router.get("/ReadStudentProfile",AuthVerification, UsersController.ReadStudentProfile)
router.post("/UpdateStudentProfile",AuthVerification, UsersController.UpdateStudentProfile)
//file

router.post("/Single-file-upload",fileController.uploadSingleFile)
router.get("/fileRead/:fileName",fileController.readfile )
router.delete("/deleteSingleFile/:fileName",fileController.deleteSingleFile)


export default router;
import md5 from "md5";
import studentModel from "../models/StudentModel.js";
import { EncodeToken } from "../utility/TokenHelper.js"; // Make sure to import this if you use i
import { registerService,studentLogin, ReadProfileService,  UpdateProfileService} from "../Service/service.js";
// User Registration
export const register = async (req, res) => {
  let result = await registerService(req);
  return res.json(result);
  
};

// User Login
export const login = async (req, res) => {
    try { let result=await studentLogin (req,res);
      return res.json(result)
        } catch (e) {
        res.status(500).json({ status: "error", error: e.toString() });
    }
};

// Get User Profile
export const ReadStudentProfile = async (req, res) => {
  let result = await ReadProfileService(req,res);
  return res.json(result);
};


export const UpdateStudentProfile = async (req, res) => {
  let result = await UpdateProfileService(req,res);
  return res.json(result);
  };


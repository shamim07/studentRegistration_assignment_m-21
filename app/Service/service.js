import md5 from "md5" 
import path from 'path';

import fs from 'fs';
import studentModel from "../models/StudentModel.js";
import { EncodeToken } from "../utility/TokenHelper.js";


export const registerService = async (req) => {
    try {
        let reqBody = req.body;
        // console.log(reqBody)
        reqBody.password = md5(req.body.password);
        let user = await studentModel.find()
        if (user.length > 0) {
          return  ({ status: "error", msg: "have account" });
        } else {
    
          let data = await studentModel.create(reqBody);
         return  ({ status: "success", data: data });
    
        }
      } catch (e) {
      return ({ status: "error", error: e.toString() });
      }
};

   export const UpdateProfileService =async(req,res)=>{
    
    const updatedStudent = req.body;
let email=req.headers.email
    try {
        const data = await studentModel.updateOne(
            {email},
           {updatedStudent}
        );

    return {status:"success",message:"user profile updated successfully",data:data}


    } catch (err) {
        return {status:"fail",message:err.toString()
        }


    }

   }
//! User Login
export const studentLogin = async (req, res) => {
    try {
      let {email,password} = req.body;
      password = md5(req.body.password);
      let MatchStage = {
        $match : {
            email:email,
            password : password
        }
      }
      let projectionStage = {
        $project : {
            "_id" :0,
            "password":0
        }
      }
      let data = await studentModel.aggregate([
            MatchStage,
            projectionStage
      ]);
  
      if (data.length > 0) {
        let token = EncodeToken(data[0]["email"]);
  
        let options = {
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          httpOnly: true,
          sameSite: "none",
          secure: true,
        };
  
        // Set cookie
        res.cookie("Token", token, options);
        return(200).json({ status: "success", token: token, data: data[0] });
      } else {
        return({ status: "unauthorized", data: data });
      }
    } catch (e) {
      res.status(200).json({ status: "error", error: e.toString() });
    }
  };
      
//readfile
 export    const ReadProfileService = async (req,res) => {
    let email = req.headers.email;
    console.log(email)
    try {
        let MatchStage = {
            $match: {
                email:email
                
            }
        };

        let project = {
            $project: {
                email: 1,
                firstName: 1,
                lastName: 1,
               
            }
        };
        let data = await studentModel.aggregate([MatchStage, project]);
        
        if (data.length > 0) {
            res.status(200).json({ status: "success", data: data[0] });
        } else {
            res.status(404).json({ status: "not found", message: "User not found" });
        }
    } catch (e) {
        res.status(500).json({ status: "error", error: e.toString() });
    }
       
    }
  
  //deletefile
export const deleteFileService=(req, res) => {
    try {
      const files = req.body?.file;
  
      if (!files || !Array.isArray(files)) {
        return { status: false, data: "No files provided or invalid input" };
      }
  
      let deletedFiles = [];
      let notFoundFiles = [];
      let errorFiles = [];
  
      // Loop over each file and handle its deletion
      files.forEach((file) => {
        const filePath = path.join(__dirname, "../../uploads", file);
  
        // Check if the file exists
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) {
              errorFiles.push(file);
            }
          });
          deletedFiles.push(file);
        } else {
          notFoundFiles.push(file);
        }
      });
      // Return the result after processing all files
      return {
        status: true,
        data: {
          message: "File deletion process complete",
          deletedFiles,
          notFoundFiles,
          errorFiles,
        },
      };
    } catch (err) {
      return { status: false, data: err.toString() };
    }
  };
  
 
   
    //! for single file upload 

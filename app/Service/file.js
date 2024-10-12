import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//! for single file upload 
export const uploadSingleFileService = async (req) => {
    try {
        // 'file' is the name attribute in the form
        const uploadedFile = req.files.file;

        // Set upload path
        const uploadPath = path.join(__dirname, '../../uploads', Date.now() + "-" + uploadedFile.name);

        // Use the mv() method to place the file on the server
        await uploadedFile.mv(uploadPath, (err) => {
            if (err) {
                return { status: true, data: "Error occurred while uploading the file." };
            }
        });
        return { status: true, data: "File uploaded successfully!" };
    } catch (err) {
        return { status: false, data: err.toString() };
    }

}
export const getReadFileService=(req) => {
    try {
        const fileName = req.params.fileName;
        const filePath = path.join(__dirname, "../../uploads", fileName);
        return filePath;
    } catch (error) {
        return { status: false, message: error.message };
    }
};


export const deleteFileService=(req,res)=>{
    try {
        const filename = req.params.fileName;
        const filePath = path.join(__dirname, '../../uploads', filename);
        fs.unlink(filePath, (err) => {
            if (err) {
                res.status(500).send('Error Deleting File');
            }
        })
        return { status: true, data: "File deleted successfully!" };
    } catch (err) {
        return { status: false, data: err.toString() };
    }
}
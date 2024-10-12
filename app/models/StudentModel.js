import mongoose from 'mongoose'
const DataSchema = new mongoose.Schema(
    { 
        email: { type: String, unique: true, required: true, lowercase: true },
        password: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        phone: { type: String }
    }
    ,
    {
        timestamps: true,
        versionKey:false,
    }

)


const studentModel =mongoose.model('students',DataSchema);
export default studentModel
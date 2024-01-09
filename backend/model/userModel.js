import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {type:String, required: true},
        userTele: {type:Number, required: true},
        userCity: {type:String, required: true},
        userEmail: {type:String, required: true},
        userPwd: {type:String, required: true},
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
export default User;
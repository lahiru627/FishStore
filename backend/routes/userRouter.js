import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import bcrypt from 'bcrypt';

const userRouter = express.Router();

userRouter.post('/', expressAsyncHandler(async(req,res) =>{
    const user = new User({
        userName: req.body.userName,
        userTele: req.body.userTele,
        userCity: req.body.userCity,
        userEmail: req.body.userEmail,
        userName: req.body.userName,
        userPwd: bcrypt.hashSync(req.body.userPwd, 8),
    })
    const createUser = await user.save();
    res.send({message: 'User added', user: createUser});
}))

export default userRouter;
import express from 'express';
import { mongoose } from 'mongoose';
import dotenv from 'dotenv';
import vehicleRouter from './routes/vehicleRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
dotenv.config();

app.use(express.json()); //middleware to parse
app.use(express.urlencoded( {extended: true}));

mongoose.connect (process.env.MongoDB_URL);

app.use('/Vehicles', vehicleRouter);
app.use('/users', userRouter);

app.get('/', (req,res) => {
    res.send('Server is ready');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
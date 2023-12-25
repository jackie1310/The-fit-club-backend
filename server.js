// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from "./routers/user.js";
import videoRouter from "./routers/video.js";
import checkoutRouter from "./routers/checkout.js";
import dataRouter from "./routers/data.js";


dotenv.config();

const app = express();
const port = 8080;

const corsOptions = {
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.ATLAS_URI;

async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
connectToDatabase();

app.use('/users', userRouter);
app.use('/videos', videoRouter);
app.use('/checkout', checkoutRouter);
app.use('/data', dataRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
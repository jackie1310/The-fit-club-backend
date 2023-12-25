import User from "./model/User.js";
import mongoose from "mongoose";
import Video from "./model/Video.js";

const uri = "mongodb+srv://test01:test01@cluster0.7jrh7w8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
connectToDatabase();


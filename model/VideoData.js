import mongoose from "mongoose";

const videoDataSchema = new mongoose.Schema({
    name: String,
    link: String,
    desc: String,
    category: String
}, {timestamps: true});

const VideoData = mongoose.model('VideoData', videoDataSchema);

export default VideoData;
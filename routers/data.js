import express from "express";
import VideoData from "../model/VideoData.js";


const router = express.Router();

router.route('/vid').get(async (req, res) => {
    VideoData.find().then(data => res.json(data));
})

router.route('/').post(async (req, res) => {
    const videos = req.body;
    for (const video of videos) {
        const name = video.name;
        const link = video.link;
        const desc = video.desc;
        const category = video.category;
        await VideoData.create({name, link, desc, category})
    }
})


export default router;
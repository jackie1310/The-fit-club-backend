import express from "express";
import Video from "../model/Video.js";
import User from "../model/User.js";
import VideoData from "../model/VideoData.js";

const router = express.Router();
router.route('/:id').get((req, res) => {
    Video.findOne({user: req.params.id})
        .then(users => VideoData.find({_id:users.videos}).then(data => res.json(data)))
        .catch(err => res.status(202).json('Error: ' + err));
});
router.route('/post').post(async (req, res) => {
    const user = req.body.user_id;
    const _id = req.body._id;
    const userExisted = await Video.findOne({user:user});
    let userVideos = [_id];
    if (userExisted) {
        for (const id of userExisted.videos) {
            userVideos.push(id);
        }
        const Updated = await Video.updateOne({user: user}, {
            videos: userVideos
        });
        res.json(Updated)
    }
    else {
        const newVideos = await Video.create({
            user, videos: userVideos
        });
        res.json(newVideos);
    }
});

router.route('/delete').put(async (req,res) => {
    const video = req.body.video;
    const user = req.body.user;
    const userVideos = await Video.findOne({user: user})
    const update = userVideos.videos.filter(item => item !== video)
    await Video.updateOne({user: user}, {videos: update})
    res.json(update);
})
export default router;
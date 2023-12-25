import express from "express";
import User from "../model/User.js";
import { decode } from "../helpers/decode.js";
import Video from "../model/Video.js";

const router = express.Router();
router.route('/:id').get(async (req, res) => {
    const userExited = await User.findById(req.params.id)
    if (!userExited) {
        res.status(202);
    }
    else {
        res.status(200).json(userExited);
    }
});
router.route('/signup').post(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = decode(req.body.password);
    const userExisted = await User.findOne({email: email})
    if (userExisted) {
        res.status(202).json("User already existed");
    }
    else {
        const newUser = await User.create({
            name, email, password
        })
        await Video.create({ 
            user: newUser._id,
            videos: []
        })
        res.status(200).json(newUser);
    }
})

router.route('/login').post(async(req,res) => {
    const email = req.body.email;
    const password = decode(req.body.password);
    const userExisted = await User.findOne({email: email});
    if (userExisted) {
        if (userExisted.password === password) {
            res.status(200).json(userExisted);
        }
        else {
            res.status(202).json("Incorrect password");
        }
    }
    else {
        res.status(202).json("You have not signed up yet!");
    }
})

router.route('/update').post(async(req,res) => {
    const user_email = req.body.user_email;
    const prod = req.body.prod;
    await User.updateOne({email: user_email}, {
        basic: prod === "BASIC PLAN" ? true : false,
        premium: prod === "PREMIUM PLAN" ? true : false,
        pro: prod === "PRO PLAN" ? true : false
    });
    res.status(200).send('ok');
})

router.route('/change').post(async(req, res) => {
    const user_email = req.body.email;
    const newPassword = req.body.newPassword;
    const userExisted = await User.findOne({email: user_email});
    if (userExisted) {
        await User.updateOne({email: user_email}, {
            password: decode(newPassword)
        });
        res.status(200).send('ok')
    }
    else {
        res.status(202).json("Could not update")
    }
})

router.route('/unsubscribe').post(async(req, res) => {
    const id = req.body.id;
    const userExisted = await User.findById(id);
    if (userExisted) {
        try {
            await User.updateOne({_id: id}, {
                basic: false,
                premium: false,
                pro: false
            })
            res.status(200).json("UnSubscribed!")
        } catch(error) {
            res.status(202).json(alert)
        }
    }
    else {
        res.status(202).json("User undefined!");
    }
})

export default router;
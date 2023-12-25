import express from "express";
import stripe from "stripe";

const router = express.Router();
router.route('/').post(async (req, res) => {
    const {prod_name, user, id} = req.body;

    const session = await stripe(process.env.STRIPE_SK).checkout.sessions.create({
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: 'USD',
                    product_data: {name: prod_name},
                    unit_amount: 0,
                }
            },
            {
                price: id,
                quantity: 1,
            }
        ],
        mode: 'subscription',
        success_url: process.env.PUBLIC_URL + "/success",
        cancel_url: process.env.PUBLIC_URL + "/cancel",
        metadata: {
            prod_name: prod_name, 
            user_email: user,
        }
    })
    res.json({
        url:session.url,
    })
})

export default router;
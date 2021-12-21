const express = require('express');
const router = express.Router();

const Razorpay = require('razorpay');
const shortid = require('shortid');
const bodyParser = require('body-parser');

const cors = require('cors');
router.use(cors());
router.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();

// Provide values of razorpay ID and Secret Key
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

router.post('/verification', (req, res) => {
    // do a validation
    const secret = '12345678'

    console.log(req.body)

    const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
            // process it
        require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else {
        // pass it
    }
    res.json({ status: 'ok' })
})

router.post('/', async(req, res) => {
    const payment_capture = 1
    const { totalPrice } = req.body;
    const currency = 'INR'

    const options = {
        amount: totalPrice * 100 * 75,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
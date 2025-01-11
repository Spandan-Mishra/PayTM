
const express = require('express');
const { Account, User } = require('../db');
const userMiddleware = require('../middlewares/user');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/balance', userMiddleware, async (req, res) => {
    const balance = await Account.findOne({
        userId: req.userId
    }).select('balance');

    if(!balance) {
        return res.status(404).json({
            message: "No account found"
        })
    }

    res.status(200).json({
        balance
    })
})

router.post('/transfer', userMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { to, amount } = req.body;

    const fromAccount = await Account.findOne({
        userId: req.userId
    })
    .session(session);

    if(!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    })
    .session(session);

    if(!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })
    .session(session);

    await Account.updateOne({
        userId: toAccount.userId
    }, {
        $inc: {
            balance: amount
        }
    })
    .session(session);

    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful"
    })
})

transfer({
    userId: "65ac44e10ab2ec750ca666a5",
    body: {
        to: "65ac44e40ab2ec750ca666aa",
        amount: 100
    }
})

transfer({
    userId: "65ac44e10ab2ec750ca666a5",
    body: {
        to: "65ac44e40ab2ec750ca666aa",
        amount: 100
    }
})

module.exports = router;
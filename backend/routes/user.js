
const express = require('express');
const router = express.Router();
const { User } = require('../db');
const { Account } = require('../db');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { JWT_SECRET } = require('../config');
const { userMiddleware } = require('../middleware');

const userSchema = z.object({
    username: z.string().min(3, { message: "Username must be atleast 3 characters" }).max(30, { message: "Username must be atmost 30 characters" }),
    firstName: z.string().min(3, { message: "First name must be atleast 3 characters" }).max(20, { message: "First name must be atmost 20 characters" }),
    lastName: z.string().min(3, { message: "Lastname must be atleast 3 characters" }).max(20, { message: "Lastname must be atmost 20 characters" }),
    password: z.string().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/), { message: "Password must contain atleast 8 characters, one uppercase, one lowercase, one number and one special character" }),
})

const signinSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" }), 
})

const updateSchema = z.object({
    firstName: z.string().min(3, { message: "First name must be atleast 3 characters" }).max(20, { message: "First name must be atmost 20 characters" }).optional(),
    lastName: z.string().min(3, { message: "Lastname must be atleast 3 characters" }).max(20, { message: "Lastname must be atmost 20 characters" }).optional(),
    password: z.string().regex("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", { message: "Password must contain atleast 8 characters, one uppercase, one lowercase, one number and one special character" }).optional(),
})

router.post('/signup', async (req, res) => {
    const parsedData = userSchema.safeParse(req.body);
    if(!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.errors[0].message });
    }

    const { username, firstName, lastName, password } = req.body;
    const existingUser = await User.findOne({
        username
    })

    if(existingUser) {
        return res.status(411).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        firstName,
        lastName,
        password: hashedPassword
    });

    await Account.create({
        userId: user._id,
        balance: Math.floor(Math.random() * 1000000)
    })

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.status(200).json({
        message: "User signed up successfully",
        token,
    })
})

router.post('/signin', async (req, res) => {
    const parsedData = signinSchema.safeParse(req.body);
    if(!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.errors[0].message });
    }

    const { username, password } = req.body;

    const user = await User.findOne({
        username
    })

    if(!user) {
        return res.status(404).json({
            message: "No user found"
        })
    }

    const { result } = bcrypt.compare(password, user.password);
    if(!result) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.status(200).json({
        token: token
    })
})

router.put('/', userMiddleware, async (req, res) => {
    const parsedData = updateSchema.safeParse(req.body);
    if(!parsedData.success) {
        return res.status(411).json({
            message: parsedData.error.errors[0].message
        });
    }

    await User.updateOne({
        id: req.userId
    }, req.body);
    
    res.status(200).json({
        message: "User updated successfully"
    });
})

router.get('/bulk', userMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User
    .find()
    .or([
        { firstName: /.*filter.*/ },
        { lastName: /.*filter.*/ },
    ])
    .select('-password');

    if(!users) {
        res.status(404).json({
            message: "No users found"
        })        
    }

    res.status(200).json({
        users
    })
})

module.exports = router;
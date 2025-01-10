
const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const app = express();

app.use('/user', userRouter);

module.exports = router;
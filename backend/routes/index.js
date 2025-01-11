
const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const accountRouter = require('./account');
const app = express();

app.use('/user', userRouter);
app.use('/account', accountRouter);

module.exports = router;
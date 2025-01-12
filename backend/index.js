
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const { PORT } = require("./config");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use('/api/v1', indexRouter);

app.get('/healthcheck', (req, res) => {
    res.status(200).json({
        message: "Server is running"
    })
})

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
})
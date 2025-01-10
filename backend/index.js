
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const { PORT } = require("./config");

app.use(express.json());
app.use(cors());
app.use('/api/v1', indexRouter);

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
})
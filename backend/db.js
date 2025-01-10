
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/paytm');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.modal('User', userSchema);

module.exports = {
    User
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/paytm');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
});

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'User' },
    balance: { type: Number, required: true },
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account 
}
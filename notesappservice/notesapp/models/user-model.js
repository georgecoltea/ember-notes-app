const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
},
{
    versionKey: false // You should be aware of the outcome after set to false
}
);
const User = mongoose.model('User', UserSchema);
module.exports = User;

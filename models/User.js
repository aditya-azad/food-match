const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  restaurants: [String]
});

mongoose.model('users', userSchema);

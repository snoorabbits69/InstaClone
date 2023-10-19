const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  Fullname: {
    type: String,
    required: true,
    minlength: 3, // Use minlength for minimum length
  },
  Username: {
    type: String,
    required: true,
    minlength: 3, // Use minlength for minimum length
  },
  Email: {
    type: String,
    required: true,
   
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  Password: {
    type: String,
    required: true,
    minlength: 8, // Use minlength for minimum length
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("users", userSchema);

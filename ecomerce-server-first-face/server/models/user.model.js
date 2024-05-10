const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      required: false,
      type: Boolean,
      default: false,
    },
    isVerified: {
      required: false,
      type: Boolean,
      default: false,
    },
    userImage: {
      required: false,
      type: String,
      default:
        "https://img.freepik.com/premium-photo/speech-therapist-digital-avatar-generative-ai_934475-9023.jpg?size=626&ext=jpg&ga=GA1.1.1266678163.1706386324&semt=ais",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

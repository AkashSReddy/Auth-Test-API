const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const salt_factor = 8;
mongoose.set("useCreateIndex", true);

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ["admin", "public"],
    default: "public"
  }
});

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(salt_factor), null);
};

module.exports = mongoose.model("User", userSchema);

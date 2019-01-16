const Promise = require("bluebird");
const User = require("../models/user");
require("dotenv").config();

/**
 * @function getUsers
 */

module.exports.getUser = async () => {
  try {
    let data = await User.find({ role: "public" });
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @function addUser
 * @param {Object}
 */

module.exports.addUser = async userDetails => {
  try {
    let message = "ok";
    console.log("A");
    let user = await User.findOne({ email: userDetails.email });
    console.log("B");
    if (user) {
      message = "User already registered";
      return message;
    }
    console.log(user);
    let newUser = new User(userDetails);
    if (userDetails.password === process.env.ADMIN_PASS) {
      console.log("password matched");
      newUser.role = "admin";
    }
    newUser.password = newUser.generateHash(userDetails.password);
    await newUser.save();
    return message;
  } catch (error) {
    throw error;
  }
};

/**
 * @function deleteUser
 * @param {Object}
 */

module.exports.deleteUser = async userDetails => {
  try {
    let message = "ok";
    let data = await User.findOne({ email: userDetails });
    if (!data) {
      message = "User not found";
      return message;
    }
    await User.findOneAndDelete({ email: userDetails });
    return message;
  } catch (error) {
    throw error;
  }
};

/**
 * @function updateUser
 * @param {Object}
 */
// module.exports.updateUser = userDetails => {
//   return new Promise((resolve, reject) => {
//     try {
//       return User.findByIdAndUpdate(
//         userDetails._id,
//         { $set: userDetails },
//         { new: true }
//       )
//         .exec()
//         .then(user => {
//           if (!user) {
//             return reject(new Error("User not found"));
//           }
//           return resolve(user);
//         })
//         .catch(err => reject(err));
//     } catch (error) {
//       return reject(error);
//     }
//   });
// };

module.exports.updateUser = async userDetails => {
  try {
    let message = "ok";
    let data = await User.findByIdAndUpdate(
      { $set: userDetails },
      { new: true }
    );
    if (!data) {
      message = "User Not Found";
      return message;
    }
    return message;
  } catch (error) {
    throw error;
  }
};

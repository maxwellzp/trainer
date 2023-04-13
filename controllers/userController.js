const User = require("../models/User");

exports.getAllUsers = async (req, res, next) => {
  try {
    // const users = await User.findAll();

    // res.status(200).json({
    //   length: users.length,
    //   data: users,
    // });
    res.json({
      message: "Hello docker3!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User(username, email, password);
    const result = await user.save();
    res.status(201).json({
      message: "User has been created",
      id: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findOne(id);
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

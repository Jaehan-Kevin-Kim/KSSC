const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  // If any field missing
  if (!name || !email || !password) {
    res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    // If user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: "Cannot create a user" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ error: "Password is not matched" });
    }

    if (user) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

//Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const getMe = async (req, res) => {
  console.log(req.user);

  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    await user.remove();
    res.status(200).json({ message: `User Id: {id} is removed` });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getMe,
  deleteUser,
};

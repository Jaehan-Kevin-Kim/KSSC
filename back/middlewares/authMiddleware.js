const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(verified.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({
        error,
      });
    }
  }

  if (!token) {
    res.status(401).json({ error: "Not authorized, no token" });
  }
});

module.exports = { auth };

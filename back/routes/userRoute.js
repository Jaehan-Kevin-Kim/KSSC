const express = require("express");
const router = express.Router();
const {
  getMe,
  registerUser,
  getUsers,
  loginUser,
  deleteUser,
} = require("../controllers/userController");
const { auth } = require("../middlewares/authMiddleware");

// router.post("/register", (req, res) => {
//   res.json({
//     message: "register user",
//   });
// });
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getMe);
router.get("/all", auth, getUsers);
router.delete("/:id", auth, deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getForms,
  postForm,
  getForm,
  updateForm,
  deleteForm,
} = require("../controllers/consultFormController");
const { auth } = require("../middlewares/authMiddleware");

router.route("/").get(auth, getForms).post(auth, postForm);
// router.route("/all").get(auth, get);

router
  .route("/:id")
  .get(auth, getForm)
  .put(auth, updateForm)
  .delete(auth, deleteForm);

// router.get("/", (req, res) => {
//   res.json("Post: Yes");
// });

module.exports = router;

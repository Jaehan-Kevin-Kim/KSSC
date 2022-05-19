const express = require("express");
const router = express.Router();
const {
  getForms,
  postForm,
  getForm,
  updateForm,
  deleteForm,
} = require("../controllers/consultFormController");

router.route("/").get(getForms).post(postForm);

router.route("/:id").get(getForm).put(updateForm).delete(deleteForm);

// router.get("/", (req, res) => {
//   res.json("Post: Yes");
// });

module.exports = router;

const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {
  getForms,
  postForm,
  getForm,
  updateForm,
  deleteForm,
  postFile,
} = require("../controllers/consultFormController");
const { auth } = require("../middlewares/authMiddleware");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },

    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, `${basename}_${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.route("/").get(getForms).post(auth, postForm);
// router.route("/all").get(auth, get);

router
  .route("/:id")
  .get(auth, getForm)
  .put(auth, updateForm)
  .delete(auth, deleteForm);

router.route("/file").post(auth, upload.single("attachment"), postFile);

// router.get("/", (req, res) => {
//   res.json("Post: Yes");
// });

module.exports = router;

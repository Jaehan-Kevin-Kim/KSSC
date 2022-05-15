const cors = require("cors");
const express = require("express");
const app = express();
const postRouter = require("./routes/post");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("main page");
});

app.get("/go", (req, res) => {
  res.send("go page");
});

app.post("/user/login", (req, res) => {
  console.log(res);
  return res.status(200).json(req.body);
});
// app.post('')

app.use("/post", postRouter);

// app.get('')

app.listen(3080, () => {
  console.log("server is running");
});

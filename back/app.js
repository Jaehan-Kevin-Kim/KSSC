const express = require("express");
const app = express();
const postRouter = require("./routes/post");

app.get("/", (req, res) => {
  res.send("main page");
});

app.get("/go", (req, res) => {
  res.send("go page");
});

// app.post('')

app.use("/post", postRouter);

// app.get('')

app.listen(3080, () => {
  console.log("server is running");
});

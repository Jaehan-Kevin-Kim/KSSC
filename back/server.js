const cors = require("cors");
const dotenv = require("dotenv").config("./env");
const express = require("express");
const app = express();
const consultFormRouter = require("./routes/consultFormRoute");
const userRouter = require("./routes/userRoute");
const port = process.env.PORT || 3080;

const connectDB = require("./config/db");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   }),
// );
// app.get("/user", (req, res) => {
//   res.json({
//     text: "hey",
//   });
// });

app.use("/user", userRouter);
// app.post('')

app.use("/consultForm", consultFormRouter);

// app.get('')

app.listen(port, () => console.log(`Server is running on ${port}`));

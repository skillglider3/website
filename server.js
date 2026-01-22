const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/skillgliderDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* SIGNUP */
app.post("/signup", async (req, res) => {
  const { name, phone, username, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, phone, username, password: hashed });
    await user.save();
    res.json({ success: true, message: "Account created" });
  } catch {
    res.json({ success: false, message: "Username already exists" });
  }
});

/* LOGIN */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ success: false });

  const match = await bcrypt.compare(password, user.password);
  res.json({ success: match });
});

app.listen(3000, () => console.log("Server running on port 3000"));

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = new express();
const PORT = 2000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// connecting to DB
// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect("mongodb://localhost:27017/myDB");
// }

// const loginSchema = new mongoose.Schema(
//   {
//     username: String,
//     password: Number,
//   },
//   { versionKey: false }
// );

// collection/model
// const Login = mongoose.model("login", loginSchema);

// const person = new Login({ username: "station", password: "1234" });
// person.save();

app.post("/", (req, res) => {
  console.log("request is made");
  let username = req.body.username;
  let password = req.body.password;

  // Login.findOne({ username: username, password: password }, (err, doc) => {
  //   if (doc) {
  //     return res.json({ success: true });
  //   } else {
  //     return res.json({ success: false });
  //   }
  // });

  if(username === "admin" && password === "pass"){
    return res.json({success : true})
  }else {
    return res.json({success : false})
  }
});

app.listen(PORT, () => {
  console.log("listen on port:", PORT);
});

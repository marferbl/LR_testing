const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  const userList = await User.find();
  res.sendStatus(200).send(userList);
});

router.post("/signup", async (req, res) => {
  let { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ code: 400, message: "❌ Correo ya existente" });
  }

  try {
    let user = await User.create(req.body);
    res.status(200).json({ code: 200, message: user });
    return user;
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "❌ Error en la BBDD al crear usuario",
      err: err.message,
    });
  }
});

router.delete("/delete", async (req, res) => {
  let users = await User.find();
  console.log(users);
  users.map(async (elm) => {
    await User.findByIdAndRemove(elm.id);
  });
});

module.exports = router;

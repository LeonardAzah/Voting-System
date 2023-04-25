const Admin = require("../model/Admin");
const bycrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  const { username, email, sex, dob, faculty, department, password } = req.body;

  if (
    !username ||
    !email ||
    !sex ||
    !dob ||
    !faculty ||
    !department ||
    !password
  )
    return res.status(400).json({ message: "All admin data is required" });

  const duplicate = await Admin.findOne({
    email: email,
  }).exec();

  if (duplicate)
    return res.status(409).json({ message: "Username already exist" });
  else {
    try {
      const hashedPwd = await bycrypt.hash(password, 10);

      const result = await Admin.create({
        username: username,
        email: email,
        sex: sex,
        dob: dob,
        faculty: faculty,
        department: department,
        password: hashedPwd,
      });
      res.status(201).json({ sucess: "New user created" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { createAdmin };

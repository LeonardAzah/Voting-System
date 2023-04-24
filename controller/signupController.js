const Student = require("../model/student");
const bycrypt = require("bcrypt");

const createStudent = async (req, res) => {
  const {
    username,
    email,
    matricule,
    sex,
    dob,
    faculty,
    department,
    password,
  } = req.body;
  // mat = mat.toUpperCase();

  if (
    !username ||
    !email ||
    !matricule ||
    !sex ||
    !dob ||
    !faculty ||
    !department ||
    !password
  )
    return res.status(400).json({ message: "All student data is required" });

  const duplicate = await Student.findOne({
    matricule: matricule,
  }).exec();

  if (duplicate)
    return res.status(409).json({ message: "Username already exist" });
  else {
    try {
      const hashedPwd = await bycrypt.hash(password, 10);

      const result = await Student.create({
        username: username,
        email: email,
        matricule: matricule,
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

module.exports = { createStudent };

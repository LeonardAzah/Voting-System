const Student = require("../model/student");

const userLogout = async (req, res) => {
  const cookies = req.cookie;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const foundUser = await Student.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      //secure: true
    });
    return res.sendStatus(204);
  }

  //delet refresh token in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    //secure:true
  });
  res.sendStatus(204);
};

module.exports = { userLogout };

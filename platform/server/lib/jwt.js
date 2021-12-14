const jwt = require("jsonwebtoken");

const createToken = async (user) => {
  const { password, ...rest } = user;
  const token = await jwt.sign(rest, process.env.SECRET, {
    expiresIn: "1y",
    algorithm: "HS256",
  });

  return token;
};

const verifyToken = async (token) => {
  const user = await jwt.verify(token, process.env.SECRET);
  console.log("user");
  console.log(user);
  return user;
};

module.exports = {
  createToken,
  verifyToken,
};

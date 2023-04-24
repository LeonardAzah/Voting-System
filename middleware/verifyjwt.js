const jwt = require("jsonwebtoken");

// const verifyJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization || req.headers.Authorization;
//   if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) return res.sendStatus(403);
//     req.user = decoded.username;
//     next();
//   });
// };

const verifyJWT = (req, res, next) => {
  const token = req.header("x-access-token"); // Get the token from the header
  if (!token) {
    return res.status(401).send("Access denied. No token provided."); // Return an error if no token is provided
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Verify the token with your secret key
    req.user = decoded.username; // Set the decoded payload as a property of the request object
    next(); // Call the next middleware function
  } catch (ex) {
    res.status(400).send("Invalid token."); // Return an error if the token is invalid
  }
};

module.exports = verifyJWT;

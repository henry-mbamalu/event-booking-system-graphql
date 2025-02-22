import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;

    return next();
  }

  const token = authHeader.split(" ")[1];
  if (token.length == 1 || !token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  return next();
};

export default isAuth;

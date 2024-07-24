import jwt from "jsonwebtoken";

export const tokenVerify = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
      });
    } else {
      jwt.verify(token, process.env.PRIVATE_KEY, (err, isVerified) => {
        if (err) {
          res.status(401).json({
            message: "token invalid",
          });
        }
        next();
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
    });
    console.log(err);
  }
};

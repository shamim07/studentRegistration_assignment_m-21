// Using ES Modules
import { DecodeToken } from "../utility/TokenHelper.js";  // Ensure .js extension is included

 export const  AuthVerification = (req, res, next) => {
  let token = req.cookies["Token"];
  let decoded = DecodeToken(token)

  if (decoded === null) {
      res.status(401).json({ status: "fail", message: "Unauthorized" })
  }
  else {

      // Set cookie for refresh token
      let options = {
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          httpOnly: true,
          sameSite: "none",
          secure: true,
      };
      res.cookie("Token", decoded.RefreshToken, options);
      let email = decoded.email;

      req.headers.email = email;
      next();
  }}
 // Exporting the middleware

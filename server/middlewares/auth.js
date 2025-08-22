import { getUser } from "../service/auth.js";
export async function restrictToLoggedInUsers(req, res, next) {
  try {
    const userUid = req.cookies?.uid;
    
    if (!userUid) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const user =  getUser(userUid); 
    if (!user) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    req.user = user; 
    next(); 
  } catch (err) {
    res.status(500).json({ error: "Internal auth error" });
  }
}


      import jwt from 'jsonwebtoken';
      const secret = process.env.JWT_SECRET || "adeel_secret*3%2>2"; 
    export function setUser( user) {   
            return jwt.sign({
                  _id: user._id,
                  email: user.email,
            },secret);
    }

    export function getUser (token){
      if  (!token) return null;
      try{
            return  jwt.verify(token,secret);
      }
      catch(err){
                  return null;
      }
    }


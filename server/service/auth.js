
      import jwt from 'jsonwebtoken';
      const secret = "adeel1695@7(&%%48sv42h4#@..'"
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


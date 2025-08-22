//     const sessionIdToUserMap = new Map();

      import jwt from 'jsonwebtoken';
      const secret = "adeel1695@7(&%%48sv42h4#@..'"
    export function setUser( user) {
            // sessionIdToUserMap.set(id,user);       
            return jwt.sign({
                  _id: user._id,
                  email: user.email,
            },secret);
    }

    export function getUser (token){
      //     return  sessionIdToUserMap.get(id);
      if  (!token) return null;
      try{
            return  jwt.verify(token,secret);
      }
      catch(err){
                  return null;
      }
    }


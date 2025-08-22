import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js'
import passwordRoutes from './routes/password.js'
import cookieParser from 'cookie-parser';
import {restrictToLoggedInUsers} from './middlewares/auth.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "https://vault-vortex.vercel.app",  
  credentials: true
}));


    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('MongoDB successfully connected via Mongoose'))
    .catch(err=>console.error(err));

app.get('/', (req, res) => {
  res.send('Server Ready!')
});


app.use('/user', userRoutes);

app.use('/api',restrictToLoggedInUsers,passwordRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

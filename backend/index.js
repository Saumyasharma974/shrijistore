import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();
const app = express();
connectDB()

const PORT = process.env.PORT || 3000;

//routes
app.use(express.json())
app.use('/api/auth', userRoutes)

//   app.get('/',(req,res)=>{
//     res.send('Hello, World!');
//   })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
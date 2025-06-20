import mongoose from 'mongoose'


async function connectDB(){
    try{
      await mongoose.connect(process.env.MongoUri)
     console.log('MongoDB connected successfully');
    }
    catch(err){
        console.error('Error connecting to MongoDB:', err.message);
   
    }
}
export default connectDB;
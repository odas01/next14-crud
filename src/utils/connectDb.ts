import mongoose from 'mongoose';

const MONGODB_URI =
   process.env.MONGO_URI || 'mongodb://localhost:27017/next-todo';

export const connectDB = async () => {
   try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB ✓');
   } catch (err) {
      console.log('Connect failed: ', err);
   }
};

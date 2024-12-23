import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import { notFound, errorHandler } from './middleware/errMiddleware.js';



const app = express();
dotenv.config();

app.use(bodyParser.json());
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ origin: 'https://storybook-frontend.onrender.com' }));
app.use(express.json());

// Routes
app.get("/",(req,res)=>{
  res.send("StoryBook-Backend");
})
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("StoryBook-Backend!");
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

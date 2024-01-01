import 'dotenv/config';
import express from "express";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import movieRoutes from "./routes/movieRoutes.js";
import cors from 'cors'
const app = express();

// cors middleware
app.use(cors())

//Middleware for JSON parsing
app.use(express.json());

// Movie Routes
app.use("/api/v1/movies", movieRoutes);

// Error handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

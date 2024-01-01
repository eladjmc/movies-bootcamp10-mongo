import express from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../controllers/movieController.js";

const router = express.Router();

// Route to get all movies
router.get("/", getAllMovies);

// Route to get a single movie by ID
router.get("/:id", getMovieById);

// Route to create a new movie
router.post("/", createMovie);

// Route to update an existing movie
router.put("/:id", updateMovie);

// Rout to delete a movie
router.delete("/:id", deleteMovie);

export default router
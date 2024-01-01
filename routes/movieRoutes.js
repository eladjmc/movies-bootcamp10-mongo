import express from "express";
import {
  createMovieController,
  deleteMovieController,
  getAllMoviesController,
  getMovieByIdController,
  updateMovieController,
} from "../controllers/movieController.js";

const router = express.Router();

// Route to get all movies
router.get("/", getAllMoviesController);

// Route to get a single movie by ID
router.get("/:id", getMovieByIdController);

// Route to create a new movie
router.post("/", createMovieController);

// Route to update an existing movie
router.put("/:id", updateMovieController);

// Rout to delete a movie
router.delete("/:id", deleteMovieController);

export default router;

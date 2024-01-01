import STATUS_CODE from "../constants/statusCodes.js";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMovieByTitle,
} from "../models/movieModel.js";

// @des      Get all the movies
// @route    GET /api/v1/movies
// @access   Public
export const getAllMoviesController  = async (req, res, next) => {
  try {
    const movies = await getAllMovies();
    res.send(movies);
  } catch (error) {
    next(error);
  }
};

// @des      Get a single movie
// @route    GET /api/v1/movies/:id
// @access   Public
export const getMovieByIdController  = async (req, res, next) => {
  try {
    const movie = await getMovieById(req.params.id);
    if (!movie) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Movie was not found");
    }
    res.send(movie);
  } catch (error) {
    next(error);
  }
};

// @des      Create a movie
// @route    POST /api/v1/movies
// @access   Public
export const createMovieController  = async (req, res, next) => {
  try {
    const { title, director, releaseYear, rating } = req.body;
    if (!title || !director || !releaseYear || !rating) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "All fields (title, director, releaseYear, rating) are required"
      );
    }

    // Check for existing movie with the same title
    const existingMovie = await getMovieByTitle(title);
    if (existingMovie) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("A movie with the same title already exists");
    }

    const newMovie = await createMovie({
      title,
      director,
      releaseYear,
      rating,
    });
    res.status(STATUS_CODE.CREATED).send(newMovie);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};

// @des      Update a movie
// @route    PUT /api/v1/movies/:id
// @access   Public
export const updateMovieController  = async (req, res, next) => {
  try {
    const { title, director, releaseYear, rating } = req.body;
    if (!title || !director || !releaseYear || !rating) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "All fields (title, director, releaseYear, rating) are required"
      );
    }

    // Check if another movie with the same title exists (excluding the current movie)
    const existingMovie = await getMovieByTitle(title);
    if (existingMovie && existingMovie._id.toString() !== req.params.id) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("A movie with the same title already exists");
    }

    const updatedMovie = await updateMovie(req.params.id, {
      title,
      director,
      releaseYear,
      rating,
    });
    if (!updatedMovie) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Movie was not found");
    }

    res.send(updatedMovie);
  } catch (error) {
    next(error);
  }
};

// @des      delete a movie
// @route    DELETE /api/v1/movies/:id
// @access   Public
export const deleteMovieController  = async (req, res, next) => {
  try {
    const deleted = await deleteMovie(req.params.id);
    if (!deleted) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Movie was not found");
    }

    res
      .status(STATUS_CODE.OK)
      .send(`Movie with the id of ${req.params.id} was deleted!`);
  } catch (error) {
    next(error);
  }
};

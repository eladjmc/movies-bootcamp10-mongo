import STATUS_CODE from "../constants/statusCodes.js";
import { readMoviesFromFile, writeMoviesToFile } from "../models/movieModel.js";
import { v4 as uuidv4 } from "uuid";

// @des      Get all the movies
// @route    GET /api/v1/movies
// @access   Public
export const getAllMovies = async (req, res, next) => {
  try {
    const movies = readMoviesFromFile();
    res.send(movies);
  } catch (error) {
    next(error);
  }
};

// @des      Get a single movie
// @route    GET /api/v1/movies/:id
// @access   Public
export const getMovieById = async (req, res, next) => {
  try {
    const movies = readMoviesFromFile();
    const movie = movies.find((m) => m.id === req.params.id);
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
export const createMovie = async (req, res, next) => {
  try {
    const { title, director, releaseYear, rating } = req.body;
    if (!title || !director || !releaseYear || !rating) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "All fields (title, director, releaseYear, rating) are required"
      );
    }

    const movies = readMoviesFromFile();
    if (movies.some((m) => m.title === title)) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("A movie with the same title already exists");
    }

    const newMovie = { id: uuidv4(), title, director, releaseYear, rating };
    movies.push(newMovie);
    writeMoviesToFile(movies);
    res.status(STATUS_CODE.CREATED).send(newMovie);
  } catch (error) {
    res.status(STATUS_CODE.BAD_REQUEST);
    next(error);
  }
};

// @des      Update a movie
// @route    PUT /api/v1/movies/:id
// @access   Public
export const updateMovie = async (req, res, next) => {
  try {
    const { title, director, releaseYear, rating } = req.body;
    if (!title || !director || !releaseYear || !rating) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error(
        "All fields (title, director, releaseYear, rating) are required"
      );
    }
    const movies = readMoviesFromFile();
    const index = movies.findIndex(m=> m.id === req.params.id)
    if(index === -1){
        res.status(STATUS_CODE.NOT_FOUND)
        throw new Error("Movie was not found!")
    }
    const lastIndex = movies.findLastIndex(m => m.title === title)
    if(lastIndex != -1 && lastIndex != index){
        res.status(STATUS_CODE.BAD_REQUEST)
        throw new Error("Cannot edit movie, movie with such title already exist!")
    }

    const updatedMovie = {...movies[index],title,director,releaseYear,rating}
    movies[index] = updatedMovie;
    writeMoviesToFile(movies)
    res.send(updatedMovie);
  } catch (error) {
    next(error)
  }
};

// @des      delete a movie
// @route    DELETE /api/v1/movies/:id
// @access   Public
export const deleteMovie = async (req, res, next) => {
  try {
    const movies = readMoviesFromFile();
    const newMovieList = movies.filter((movie) => movie.id !== req.params.id);

    if (newMovieList.length === movies.length) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Movie was not found");
    }
    writeMoviesToFile(newMovieList);
    res
      .status(STATUS_CODE.OK)
      .send(`Movie with the id of ${req.params.id} was deleted!`);
  } catch (error) {
    next(error);
  }
};

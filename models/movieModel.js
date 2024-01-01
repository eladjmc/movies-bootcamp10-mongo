
import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

export const getAllMovies = async () => {
  const db = getDB();
  return await db.collection('movies').find({}).toArray();
};

export const getMovieById = async (id) => {
  const db = getDB();
  const movieId = new ObjectId(id);
  return await db.collection('movies').findOne({ _id: movieId });
};

export const getMovieByTitle = async (title) => {
    const db = getDB();
    return await db.collection('movies').findOne({ title: title });
  };

  export const createMovie = async (movie) => {
    const db = getDB();
    const result = await db.collection('movies').insertOne(movie);
  
    // Get the id of the inserted movie
    const insertedId = result.insertedId;
  
    // Use getMovieById to retrieve and return the newly added movie
    return await getMovieById(insertedId.toString());
  };
  


export const updateMovie = async (id, updatedMovie) => {
  const db = getDB();
  const movieId = new ObjectId(id);
  await db.collection('movies').updateOne({ _id: movieId }, { $set: updatedMovie });
  return getMovieById(id);
};

export const deleteMovie = async (id) => {
  const db = getDB();
  const movieId = new ObjectId(id);
  await db.collection('movies').deleteOne({ _id: movieId });
};

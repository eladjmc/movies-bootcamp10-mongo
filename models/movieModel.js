
import { ObjectId } from 'mongodb';
import { getDB } from '../config/db.js';

export const getAllMovies = async () => {
  const db = getDB();
  return await db.collection('movies').find({}).toArray();
};

export const getMovieById = async (id) => {
  const db = getDB();
  return await db.collection('movies').findOne({ _id: ObjectId(id) });
};

export const getMovieByTitle = async (title) => {
    const db = getDB();
    return await db.collection('movies').findOne({ title: title });
  };

export const createMovie = async (movie) => {
  const db = getDB();
  const result = await db.collection('movies').insertOne(movie);
  return result.ops[0];
};

export const updateMovie = async (id, updatedMovie) => {
  const db = getDB();
  await db.collection('movies').updateOne({ _id: ObjectId(id) }, { $set: updatedMovie });
  return getMovieById(id);
};

export const deleteMovie = async (id) => {
  const db = getDB();
  await db.collection('movies').deleteOne({ _id: ObjectId(id) });
};

import fs from 'fs'
import { filePath } from '../utils/dataFilePath.js'


const initializeMovieFile = () => {
    if(!fs.existsSync(filePath)){
        fs.writeFileSync(filePath,JSON.stringify([]),'utf8')
    }
}

const readMoviesFromFile = () => {
    try {
        initializeMovieFile();
        const fileData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(fileData)
    } catch (error) {
        throw new Error("Error reading from movie file")
    }
}

const writeMoviesToFile = (movies) => {
    try {
        initializeMovieFile();
        fs.writeFileSync(filePath,JSON.stringify(movies), 'utf-8')
    } catch (error) {
        throw new Error("Error writing to the movies file")
    }
}

export {readMoviesFromFile, writeMoviesToFile}
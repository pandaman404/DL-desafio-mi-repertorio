import { readFile, writeFile } from 'node:fs/promises';
import path from 'path';

const readSongsFile = async () => {
  try {
    return JSON.parse(await readFile(path.resolve('src/songs.json'), 'utf-8'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('No existe el archivo songs.json');
    } else {
      console.log(error);
    }
  }
};

const writeSongsFile = async (songs) => {
  try {
    await writeFile(path.resolve('src/songs.json'), JSON.stringify(songs));
    console.log('Canción creada exitosamente!');
  } catch (error) {
    console.log(error);
  }
};

export { readSongsFile, writeSongsFile };

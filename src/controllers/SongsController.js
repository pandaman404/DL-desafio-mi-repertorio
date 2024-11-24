import { StatusCodes } from 'http-status-codes';
import { readSongsFile, writeSongsFile } from '../utils/fileOperations.js';

const createSong = async (req, res) => {
  const newSong = req.body;

  if (!newSong || !newSong.titulo || !newSong.artista || !newSong.tono) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Canción invalida',
    });
  }

  const songList = (await readSongsFile()) || [];

  newSong.id = songList.length + 1;

  songList.push({
    id: newSong.id,
    titulo: newSong.titulo,
    artista: newSong.artista,
    tono: newSong.tono,
  });

  await writeSongsFile(songList);

  return res.status(StatusCodes.CREATED).json({ message: 'Canción creada exitosamente' });
};

const getSongs = async (_, res) => {
  const songs = (await readSongsFile()) || [];
  return res.status(StatusCodes.OK).json(songs);
};

const editSong = async (req, res) => {
  const id = Number(req.params.id);
  const editedSong = req.body;

  if (!editedSong || !editedSong.titulo || !editedSong.artista || !editedSong.tono) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: 'Canción invalida',
    });
  }

  const songs = (await readSongsFile()) || [];

  const songIndex = songs.findIndex((song) => song.id === id);

  if (songIndex < 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: `No existe canción con id: ${id}`,
    });
  }

  songs[songIndex].titulo = editedSong.titulo;
  songs[songIndex].artista = editedSong.artista;
  songs[songIndex].tono = editedSong.tono;

  await writeSongsFile(songs);

  return res.status(StatusCodes.CREATED).json(songs);
};

const deleteSong = async (req, res) => {
  const id = Number(req.params.id);
  const songs = (await readSongsFile()) || [];

  const updatedSongs = songs.filter((song) => song.id !== id);
  await writeSongsFile(updatedSongs);

  return res.status(StatusCodes.OK).json(updatedSongs);
};

export { createSong, getSongs, editSong, deleteSong };

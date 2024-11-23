import { readSongsFile, writeSongsFile } from '../utils/fileOperations.js';

const createSong = async (req, res) => {
  const newSong = req.body;

  if (!newSong || !newSong.titulo || !newSong.artista || !newSong.tono) {
    return res.status(400).json({
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

  return res.status(201).json({});
};

const getSongs = async (_, res) => {
  const songs = (await readSongsFile()) || [];
  return res.status(200).json(songs);
};

const editSong = async (req, res) => {
  const id = Number(req.params.id);
  const editedSong = req.body;

  if (!editedSong || !editedSong.titulo || !editedSong.artista || !editedSong.tono) {
    return res.status(400).json({
      error: 'Canción invalida',
    });
  }

  const songs = (await readSongsFile()) || [];

  const songIndex = songs.findIndex((song) => song.id === id);

  if (songIndex < 0) {
    return res.status(404).json({
      error: `No existe canción con id: ${id}`,
    });
  }

  songs[songIndex].titulo = editedSong.titulo;
  songs[songIndex].artista = editedSong.artista;
  songs[songIndex].tono = editedSong.tono;

  await writeSongsFile(songs);

  return res.status(201).json(songs);
};

const deleteSong = async (req, res) => {
  const id = Number(req.params.id);
  const songs = (await readSongsFile()) || [];

  const updatedSongs = songs.filter((song) => song.id !== id);
  await writeSongsFile(updatedSongs);

  return res.status(200).json(updatedSongs);
};

export { createSong, getSongs, editSong, deleteSong };

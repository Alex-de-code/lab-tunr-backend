const db = require("../db/dbConfig.js");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (error) {
    return error;
  }
};

// GET one song
const getOneSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return error;
  }
};

// POST one song
const createOneSong = async (song) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

// UPDATE
const updateSong = async (id, song) => {
  const { name, artist, album, time, is_favorite } = song;
  try {
    const updateSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
      [name, artist, album, time, is_favorite, id]
    );
    return updateSong;
  } catch (error) {
    return "Song not found";
  }
};

//DELETE
const deleteSong = async (id) => {
  try {
    const deleteSong = await db.one(
      "DELETE FROM songs WHERE id=$1 RETURNING *",
      id
    );
    return deleteSong;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllSongs,
  getOneSong,
  createOneSong,
  updateSong,
  deleteSong,
};

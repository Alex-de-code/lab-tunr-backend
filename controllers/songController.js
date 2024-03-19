const express = require("express");

const songs = express.Router();

const {
  getAllSongs,
  getOneSong,
  createOneSong,
  updateSong,
  deleteSong,
} = require("../queries/songs");

const {
  checkNameAndArtist,
  checkBoolean,
} = require("../validations/checkSongs.js");

// INDEX
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await getOneSong(id);
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
songs.post("/", checkBoolean, checkNameAndArtist, async (req, res) => {
  try {
    const song = await createOneSong(req.body);
    res.json(song);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

//UPDATE
songs.put("/:id", checkBoolean, checkNameAndArtist, async (req, res) => {
  const { id } = req.params;
  if (id) {
    const updatedSong = await updateSong(id, req.body);
    res.status(200).json(updatedSong);
  } else {
    res.status(400).json({ error });
  }
});

// DELETE
songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json({ message: "song deleted" });
  } else {
    res.status(404).json("Song not found");
  }
});

module.exports = songs;

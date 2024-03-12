const express = require("express");

const songs = express.Router();

const { getAllSongs } = require("../queries/songs");

// INDEX
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

songs.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Get by id:${id} router` });
});

songs.post("/", (req, res) => {
  res.json({ message: "Post route" });
});

songs.put("/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Update item at id: ${id}` });
});

songs.delete("/:id", (req, res) => {
  const { id } = req.params;

  res.json({ message: `Delete Item based on id: ${id}` });
});

module.exports = songs;

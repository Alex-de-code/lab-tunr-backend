const checkNameAndArtist = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Name is required" });
  } else if (!req.body.artist) {
    res.status(400).json({ error: "Artist is required" });
  } else {
    return next();
  }
};

const checkBoolean = (req, res, next) => {
  const { is_favorite } = req.body;

  if (
    is_favorite == "true" ||
    is_favorite == "false" ||
    typeof is_favorite == "boolean"
  ) {
    console.log("received boolean");
    next();
  } else {
    res.status(400).json({ error: "is_favorite must be a boolean value" });
  }
};

module.exports = { checkBoolean, checkNameAndArtist };

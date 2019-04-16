const router = require("express").Router();
const Posts = require("../data/dbConfig.js");

router.get("/", async (req, res) => {
  try {
    const allPosts = await Posts.getAll();
    res.status(200).json(allPosts);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal server error: getting ALL posts" });
  }
});

module.exports = router;

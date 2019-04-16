const router = require("express").Router();
const restrict = require("../auth/restrict.js");
const Posts = require("./model.js");

router.get("/", restrict, async (req, res) => {
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

router.post(
  "/add",
  restrict,
  async (
    { decoded: { username, id }, body: { picture, description } },
    res
  ) => {
    if (picture) {
      try {
        const newPost = { picture, upvotes: 0 };
        newPost.description = description ? description : "";
        newPost.user_id = id;
        const resPost = await Posts.insert(newPost);
        res.status(201).json(resPost);
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error: adding post" });
      }
    } else {
      console.log("Post without a picture");
      res.status(400).json({ message: "Posts must contain a picture" });
    }
  }
);

router.put("/:id", (req, res) => {});

module.exports = router;

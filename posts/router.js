const router = require("express").Router();
const restrict = require("../auth/restrict.js");
const Posts = require("./model.js");

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

router.put(
  "/:pid",
  restrict,
  async ({ params: { pid }, body: { picture, description, upvotes } }, res) => {
    const updatedObj = { id: pid };
    if (picture || description || upvotes) {
      if (picture) updatedObj.picture = picture;
      if (description) updatedObj.description = description;
      if (upvotes) updatedObj.upvotes = upvotes;
      try {
        const updated = await Posts.update(pid, updatedObj);
        updated
          ? res.status(200).json(updated)
          : res.status(500).json({ message: "Post not updated" });
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "Internal server error: updating post" });
      }
    } else {
      console.log("Updating post w/o info");
      res.status(400).json({
        message: "Updating a post requires a picture, description, or upvotes"
      });
    }
  }
);

router.delete("/:pid", async ({ params: { pid } }, res) => {
  try {
    const deleted = await Posts.remove(pid);
    deleted
      ? res.status(204).end()
      : res.status(500).json({ message: "Post not deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error: deleting post" });
  }
});

module.exports = router;

const router = require("express").Router();
const restrict = require("../auth/restrict.js");

const Posts = require("./model.js");
const {
  prepNewPost,
  prepUpdatePost,
  verifyPostOwner
} = require("./middleware/");

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

router.post("/add", restrict, prepNewPost, async ({ newPost }, res) => {
  try {
    const inserted = await Posts.insert(newPost);
    inserted
      ? res.status(201).json(inserted)
      : res.status(500).json({ message: "New post not created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error: adding post" });
  }
});

router.get("/post/:pid", async ({ params: { pid } }, res) => {
  try {
    const post = await Posts.getBy({ id: pid }).first();
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error retrieving that post" });
  }
});

router.put(
  "/edit/:pid",
  restrict,
  verifyPostOwner,
  prepUpdatePost,
  async ({ updated, pid }, res) => {
    try {
      const updatedPost = await Posts.update(pid, updated);
      updatedPost
        ? res.status(200).json(updatedPost)
        : res.status(500).json({ message: "Post not updated" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error: updating post" });
    }
  }
);

router.delete(
  "/:pid",
  restrict,
  verifyPostOwner,
  async ({ params: { pid } }, res) => {
    try {
      const deleted = await Posts.remove(pid);
      deleted
        ? res.status(204).end()
        : res.status(500).json({ message: "Post not deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error: deleting post" });
    }
  }
);

router.put("/upvote", restrict, async ({ body: { id } }, res) => {
  try {
    const post = await Posts.getBy({ id }).first();
    const updated = { upvotes: post.upvotes + 1 };
    const updatedPost = await Posts.update(id, updated);

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal server error: incrementing upvotes" });
  }
});

router.put("/downvote", restrict, async ({ body: { id } }, res) => {
  // Shameless copy/paste D:
  // Probably should be written as /vote/:upOrDown
  // However, FE is already using and I don't want to confuse him further
  try {
    const post = await Posts.getBy({ id }).first();
    const updated = { upvotes: post.upvotes - 1 };
    const updatedPost = await Posts.update(id, updated);

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Internal server error: decrementing upvotes" });
  }
});

module.exports = router;

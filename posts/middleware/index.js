const Posts = require("../model.js");
module.exports = {
  prepNewPost,
  prepUpdatePost,
  verifyPostOwner
};

function prepNewPost(req, res, next) {
  const {
    decoded: { id },
    body: { picture, description }
  } = req;
  if (picture) {
    const newPost = { picture, upvotes: 0 };
    newPost.description = description ? description : "";
    newPost.user_id = id;
    req.newPost = { ...newPost };
    next();
  } else {
    console.log("Post without a picture");
    res.status(400).json({ message: "Posts must contain a picture" });
  }
}

function prepUpdatePost(req, res, next) {
  const {
    params: { pid },
    body: { picture, description, upvotes }
  } = req;
  if (picture || description || upvotes) {
    const updated = {};
    if (picture) updated.picture = picture;
    if (description) updated.description = description;
    if (upvotes) updated.upvotes = upvotes;
    req.updated = { ...updated };
    req.pid = pid;
    next();
  } else {
    console.log("Updating post w/o info");
    res.status(400).json({
      message: "Updating a post requires a picture, description, or upvotes"
    });
  }
}

async function verifyPostOwner(
  { params: { pid }, decoded: { id } },
  res,
  next
) {
  try {
    const { ownerID } = await Posts.getPostsUserID(pid);
    ownerID === id
      ? next()
      : res.status(400).json({ message: "User does not own that post" });
  } catch (err) {
    console.log("No post at ID: delete");
    res.status(400).json({ message: "No post with that ID" });
  }
}

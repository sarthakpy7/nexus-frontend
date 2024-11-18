import Post from "./../models/Post.js";

const getThreads = async (req, res) => {
  try {
    const threads = await Post.find()
      .populate({
        path: "author",
        select: "name email profilePicture role",
      })
      .populate({
        path: "likes",
        select: "name profilePicture",
      })
      .populate({
        path: "comments",
        populate: { path: "author", select: "name profilePicture" },
      })
      .select("title content createdAt updatedAt")
      .sort({ createdAt: -1 });

    res.json(threads);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createThread = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const thread = new Post({
      title,
      content,
      author: req.user.id,
    });
    const createdThread = await thread.save();
    res.status(201).json(createdThread);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getThreadById = async (req, res) => {
  try {
    const thread = await Post.findById(req.params.id)
      .populate("author", "name")
      .populate("comments.author", "name");
    if (thread) {
      res.json(thread);
    } else {
      res.status(404).json({ message: "Thread not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addReply = async (req, res) => {
  try {
    const thread = await Post.findById(req.params.id);
    if (thread) {
      const reply = {
        content: req.body.content,
        author: req.user.id,
      };
      thread.comments.push(reply);
      thread.updatedAt = Date.now();
      await thread.save();
      res.status(201).json(thread);
    } else {
      res.status(404).json({ message: "Thread not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const likeThread = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likedIndex = post.likes.indexOf(userId);
    if (likedIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likedIndex, 1);
    }

    await post.save();
    console.log("Liked");
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getThreadWithLikeCount = async (req, res) => {
  try {
    const { postId } = req.params;
    const thread = await Post.findById(postId);

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    const likeCount = thread.likes.length;
    res.json({ thread, likeCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getReplies = async (req, res) => {
  try {
    const { threadId } = req.params;
    const thread = await Post.findById(threadId)
      .populate({
        path: "comments",
        populate: { path: "author", select: "name profilePicture" },
      })
      .select("comments");

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    res.json(thread.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getThreads,
  createThread,
  getThreadById,
  addReply,
  likeThread,
  getThreadWithLikeCount,
  getReplies,
};

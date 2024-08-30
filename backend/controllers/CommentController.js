const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");

module.exports.Comment = async (req, res, next) => {
    const findPost = await Post.findById(req.params.postid);
    if (!findPost) {
        return res.status(404).json({ msg: "The post doesn't exist" });
    }
    try {
        const currentcomment = await Comment.create({
            postId: req.params.postid,
            userId: req.body.id,
            text: req.body.text,
            Username: req.body.Username,
            avatarImage: req.body.avatarImage
        });
        console.log(currentcomment);
        return res.status(201).json({ comment: currentcomment });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

module.exports.Reply = async (req, res, next) => {
    const ParentComment = await Comment.findById(req.params.parentid);
    if (!ParentComment) {
        return res.status(404).json({ msg: "Can't reply" });
    }
    try {
        const currentcomment = await Comment.create({
            postId: ParentComment.postid,
            userId: req.body.id,
            text: req.body.text,
            Username: req.body.Username,
            avatarImage: req.body.avatarImage,
            ParentComment: ParentComment._id
        });
        console.log(currentcomment);
        return res.status(201).json({ comment: currentcomment });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

module.exports.DeleteComment = async (req, res, next) => {
    const findPost = await Post.findById(req.params.postid);
    return res.status(200).json({ post: findPost });
}

module.exports.getComment = async (req, res, next) => {
  const limit = 5;
  const page = parseInt(req.query.page) || 1;
  const start = (page - 1) * limit;
const {postId}=req.params;
console.log(postId)
  try {
      const findComment = await Comment.find({"postId":req.params.postId}).skip(start).limit(limit);
         

      return res.status(200).json({ comment: findComment });
  } catch (e) {
      return res.status(500).json({ error: e.message || 'An unexpected error occurred' });
  }
};
module.exports.getReplyComment = async (req, res, next) => {
  const limit = 5;
  const page = parseInt(req.query.page) || 1;
  const start = (page - 1) * limit;
const {postId}=req.params;
console.log(postId)
  try {
      const replies = await Comment.find({ParentComment:req.params.parentid}).skip(start).limit(limit);
         

      return res.status(200).json({ replies: replies });
  } catch (e) {
      return res.status(500).json({ error: e.message || 'An unexpected error occurred' });
  }
};
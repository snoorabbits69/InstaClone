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
            userId: req.user._id,
            text: req.body.text,
        });
       let savedcomment=await Comment.findById(currentcomment._id).populate('userId',"Username Fullname _id avatarImage")

        return res.status(201).json({ comment: savedcomment });
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
            postId: ParentComment.postId,
            userId: req.user._id,
            text: req.body.text,
          
        });
        let savedcomment=await Comment.findById(currentcomment._id).populate('userId',"Username Fullname _id avatarImage")

        return res.status(201).json({ comment: savedcomment });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

module.exports.DeleteComment = async (req, res, next) => {
    const findPost = await Post.findById(req.params.postid);
    return res.status(200).json({ post: findPost });
}

module.exports.getComment = async (req, res, next) => {
    console.log("calling ")
  const limit = 5;
  const page = parseInt(req.query.page) || 1;
  const start = (page - 1) * limit;
const {postId}=req.params;
  try {
      const findComment = await Comment.find({"postId":req.params.postId}).populate('userId',"Username avatarImage _id Fullname").skip(start).limit(limit);
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
  try {
      const replies = await Comment.find({ParentComment:req.params.parentid}).populate('userId',"Username avatarImage _id Fullname").skip(start).limit(limit);
      return res.status(200).json({ replies: replies });
  } catch (e) {
      return res.status(500).json({ error: e.message || 'An unexpected error occurred' });
  }
};
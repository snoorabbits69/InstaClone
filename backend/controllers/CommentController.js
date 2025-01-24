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
    const { parentid } = req.params;
    const { text } = req.body;

    if (parentid=="") {
        return res.status(400).json({ msg: "Invalid parent comment ID" });
    }

    if (!text || typeof text !== "string") {
        return res.status(400).json({ msg: "Comment text is required" });
    }

    try {
        const parentComment = await Comment.findById(parentid);
        if (!parentComment) {
            return res.status(404).json({ msg: "Parent comment not found" });
        }

        const newComment = await Comment.create({
            postId: parentComment.postId,
            userId: req.user._id,
            text,
            parentComment: parentComment._id
        });
              parentComment.replies.push(newComment._id)
             await parentComment.save();
        const savedComment = await Comment.findById(newComment._id).populate(
            "userId",
            "Username Fullname _id avatarImage"
        );

        return res.status(201).json({ comment: savedComment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error });
    }
};

module.exports.DeleteComment = async (req, res, next) => {
    try {
        console.log(req.params.commentId);
        const findComment = await Comment.findById(req.params.commentId);
        console.log(findComment);

        if (!findComment) {
            return res.status(500).json({ status: false, error: "The comment doesn't exist" });
        } else {
            findComment.isDeleted = true;
            findComment.text = "The comment has been deleted";
            await findComment.save();
            return res.status(200).json({ status: true, comment: findComment }); 
        }
    } catch (e) {
        return res.status(500).json({ status: false, error: e.message });
    }
};


module.exports.getComment = async (req, res, next) => {
    console.log("calling ")
  const limit = 10;
  const page = parseInt(req.query.page) || 1;
  const start = (page - 1) * limit;
const {postId}=req.params;
  try {
      const findComment = await Comment.find({"postId":postId,parentComment:null})
      .populate('userId',"Username avatarImage _id Fullname")
       .populate({
        path: 'replies',
        populate: {
          path: 'userId',
          select: 'Username avatarImage _id Fullname',
        },
      }).skip(start).limit(limit);
     
      return res.status(200).json({status:true, comment: findComment });
  } catch (e) {
      return res.status(500).json({ error: e.message || 'An unexpected error occurred' });
  }
};

// module.exports.getReplyComment = async (req, res, next) => {
//   const limit = 5;
//   const page = parseInt(req.query.page) || 1;
//   const start = (page - 1) * limit;
// const {postId}=req.params;
//   try {
//       const replies = await Comment.find({ParentComment:req.params.parentid}).populate('userId',"Username avatarImage _id Fullname").skip(start).limit(limit);
//       return res.status(200).json({status:true, replies: replies });
//   } catch (e) {
//       return res.status(500).json({ error: e.message || 'An unexpected error occurred' });
//   }
// };
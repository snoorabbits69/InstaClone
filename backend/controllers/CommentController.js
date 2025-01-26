import Post from "../models/PostModel.js";
import Comment from "../models/CommentModel.js";
import { client } from "../config/RedisConnection.js";
async function invalidatePostCache(postId) {
    try {
        const keys = await client.keys(`comments:${postId}:page:*`);
        if (keys.length > 0) {
            await client.del(keys);
            console.log(`Cache invalidated for post ${postId}`);
        }
    } catch (error) {
        console.error("Error invalidating cache:", error);
    }
}
export const setComment = async (req, res, next) => {
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
         await invalidatePostCache(req.params.postid)
        return res.status(201).json({ comment: savedcomment });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
}

export const Reply = async (req, res, next) => {
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
        await invalidatePostCache(parentComment.postId)

        return res.status(201).json({ comment: savedComment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error });
    }
};

export const DeleteComment = async (req, res, next) => {
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
            await invalidatePostCache(findComment.postId)

            return res.status(200).json({ status: true, comment: findComment }); 
        }
    } catch (e) {
        return res.status(500).json({ status: false, error: e.message });
    }
};



  
export const getComment = async (req, res, next) => {
 
    const limit = 10;
    const page = parseInt(req.query.page) || 1;
    const start = (page - 1) * limit;
    const { postId } = req.params;
  
    try {
        const cacheKey=`comments:${postId}:page:${page}`
       let data;
       try{
       data==await client.get(cacheKey)
       }catch(e){
        console.log(e)
       }
    if(data){
        return res.status(200).json({ status: true, comment: JSON.parse(data) })
    }
    else{
      const populated = {
        path: 'replies',
        populate: {
          path: 'userId',
          select: 'Username avatarImage _id Fullname',
        },
      };
  
      let findComments = await Comment.find({ "postId": postId, parentComment: null })
        .skip(start)
        .limit(limit).populate('userId', 'Username avatarImage _id Fullname')
  
      const populateRepliesRecursively = async (comments) => {
        for (let comment of comments) {
          await Comment.populate(comment, populated);
          
          if (comment.replies && comment.replies.length > 0) {
            await populateRepliesRecursively(comment.replies);
          }
        }
      };
  
      await populateRepliesRecursively(findComments);
      client.setEx(cacheKey, 600, JSON.stringify(findComments)); 
      return res.status(200).json({ status: true, comment: findComments });
    }
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
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  Selectedcomments: [],
  parentId:"",
  parentUser:"",
};

const CommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentAdd: (state, action) => {
      const commentIds = new Set(state.Selectedcomments.map((comment) => comment._id));
      let updatedComments = [...state.Selectedcomments];
      action.payload?.forEach((comment) => {
        if (!commentIds.has(comment._id)) {
          updatedComments.push(comment);
          commentIds.add(comment._id);
        }
      });
      state.Selectedcomments = updatedComments;
    },

    commentInsert: (state, action) => {
      function insertComment(comment, selectedComments) {
        let updatedComments = [...selectedComments];
        
        if (comment.parentComment === null) {
          updatedComments.push(comment);
          return updatedComments;
        }
        
        updatedComments = updatedComments.map((selcomment) => {
          if (comment.parentComment === selcomment._id) {
            return {
              ...selcomment,
              replies: [...selcomment.replies, comment]
            };
          }
          
          if (selcomment.replies && selcomment.replies.length > 0) {
            return {
              ...selcomment,
              replies: insertComment(comment, selcomment.replies)
            };
          }
          
          return selcomment;
        });
        
        return updatedComments;
      }
      
      state.Selectedcomments = insertComment(action.payload, state.Selectedcomments);
    },
    

    commentDelete: (state, action) => {
      function deleteComment(comment, selectedComments) {
       let updatedComments = selectedComments.map((selComment) => {
          if (selComment._id === comment._id) {
            if(selComment.replies && selComment.replies>0){
            return {
              ...selComment,
              text: comment.text,
              isDeleted: true,
            };
          }
          return null;
          }
    
          if (selComment.replies && selComment.replies.length > 0) {
            return {
              ...selComment,
              replies: deleteComment(comment, selComment.replies),
            };
          }
    
          return selComment;
        });
         updatedComments=updatedComments.filter((comment)=>comment!=null)
        return updatedComments;
      }
    
      state.Selectedcomments = deleteComment(action.payload, state.Selectedcomments);
    },
    addParentId:(state,action)=>{
     
state.parentId=action.payload.id
state.parentUser=action.payload.Username
    },
    removeParentId:(state,action)=>{
      state.parentId=""
      state.parentUser=""
    },
    resetcomment:(state,action)=>{
     return initialState
    }
  },
});

export const { commentAdd,commentDelete,commentInsert,addParentId,removeParentId,resetcomment } = CommentSlice.actions;
export default CommentSlice.reducer;
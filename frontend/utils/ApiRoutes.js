const host="http://localhost:3000";
export const registerRoute=`/api/auth/register`;
export const loginRoute=`/api/auth/login`;
export const logoutRoute=`/api/auth/logout`;
export const GoogleRoute=`/api/auth/google`;
export const uploadRoute=(id)=>{return `/api/user/profile/${id}`};
export const getUserRoute=(id)=>{return `/api/user/getUser/${id}`};
export const SearchRoute=(id)=>{return `${host}/api/user/search/${id}`};
export const AddFollowerRoute=(id)=>{return `/api/user/addfollowers/${id}`}
export const RemoveFollowerRoute=(id)=>{return `/api/user/removefollowers/${id}`}
export const GetUserfromIdRoute=(id)=>{return `/api/user/getuserfromid/${id}`}
export const ForgetPasswordRoute=`/api/auth/forgotpassword`;
export const UploadPostRoute=`/api/post/create`;
export const GetPostRoute=(id)=>`/api/post/getPosts/${id}`;
export const GetPostfromIdRoute=(id)=>`/api/post/getPost/${id}`;
export const AddcommentRoute=(id)=>`/api/comment/${id}`;
export const replyCommentRoute=(id)=>`/api/reply/${id}`
export const DeleteCommentRoute=(id)=>`/api/deletecomment/${id}`
export const RemoveProfilePicRoute=(id)=>`/api/user/deleteProfilePic/${id}`;
export const GetcommentRoute=(id,page)=>`/api/comment/get/${id}?page=${page}`;
export const LikePostRoute=(id)=>`/api/post/likes/${id}`
export const changeAccountTypeRoute=(id)=>`/api/user/privateaccount/${id}`
export const CancelFollowRequestRoute=(id)=>`/api/user/cancelrequest/${id}`
export const FetchChatRoutes=(page)=>`/api/chat?page=${page}`
export const AccessChatRoutes=`/api/chat`
export const SendMessageRoute=`/api/message`
export const getMessagesRoute=(chatid)=>`/api/message/${chatid}`
export const getHomePagesRoute=(page)=>`/api/post/gethomepost?page=${page}`
export const CreateGroupRoute=`/api/chat/creategroup`
export const UpdateUsernameRoute=`/api/user/updateusername`
export const UpdateFullNameRoute=`/api/user/updatefullname`
export const UpdatePasswordRoute=`/api/user/updatePassword`
export const DeletePostRoute=(id)=>`api/post/delete/${id}`
export const AddUserstoChatroute="api/chat/addtogroup"

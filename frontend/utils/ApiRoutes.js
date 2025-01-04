const host="http://localhost:3000";
export const registerRoute=`${host}/api/auth/register`;
export const loginRoute=`${host}/api/auth/login`;
export const logoutRoute=`${host}/api/auth/logout`;
export const uploadRoute=(id)=>{return `${host}/api/user/profile/${id}`};
export const GoogleRoute=`${host}/api/auth/google`;
export const getUserRoute=(id)=>{return `${host}/api/user/getUser/${id}`};
export const SearchRoute=(id)=>{return `${host}/api/user/search/${id}`};
export const AddFollowerRoute=(id)=>{return `${host}/api/user/addfollowers/${id}`}
export const RemoveFollowerRoute=(id)=>{return `${host}/api/user/removefollowers/${id}`}
export const GetUserfromIdRoute=(id)=>{return `${host}/api/user/getuserfromid/${id}`}
export const ForgetPasswordRoute=`${host}/api/auth/forgotpassword`;
export const UploadPostRoute=`${host}/api/post/create`;
export const GetPostRoute=(id)=>`${host}/api/post/getPosts/${id}`;
export const GetPostfromIdRoute=(id)=>`${host}/api/post/getPost/${id}`;
export const AddcommentRoute=(id)=>`${host}/api/comment/${id}`;
export const RemoveProfilePicRoute=(id)=>`${host}/api/user/deleteProfilePic/${id}`;
export const GetcommentRoute=(id,page)=>`${host}/api/comment/get/${id}?page=${page}`;
export const LikePostRoute=(id)=>`${host}/api/post/likes/${id}`
export const changeAccountTypeRoute=(id)=>`${host}/api/user/privateaccount/${id}`
export const cancelFollowRequestRoute=(id)=>`${host}/api/user/cancelrequest/${id}`
export const FetchChatRoutes=(page)=>`${host}/api/chat?page=${page}`

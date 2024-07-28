const host="http://localhost:3000";
import GetUser from './../src/hooks/GetUser';
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
export const UploadPostRoute=(id)=>`${host}/api/post/create/${id}`;
export const GetPostRoute=(id)=>`${host}/api/post/getPosts/${id}`;


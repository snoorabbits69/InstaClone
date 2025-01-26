import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  Fullname: {
    type: String,
    required: true,
    minlength: 3, // Use minlength for minimum length
  },
  Username: {
    type: String,
    required: true,
    minlength: 3, // Use minlength for minimum length
  },
  Email: {
    type: String,
    required: true,
   
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  
  Password: {
    type: String,
    required: true,
    minlength: 8, // Use minlength for minimum length
  },
  avatarImage: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

  },
  Posts:{
    type:Number,
    default:0
  },
  followercount:{
    type:Number,
    default:0
  },
  followingcount:{
    type:Number,
    default:0
  },
followersname:{
  type:[{id:String}],
  default:[]
},
followingname:{
  type:[{id:String}],  
  default:[]
},
Account: {
  type: {
    private: { type: Boolean, default: false },
    Requests:{type:[{id:mongoose.Schema.Types.ObjectId}],default:[]}
  },
 default:{
  private:false,
Requests:[]
 }
}
},{
  timestamps:true
});

export default mongoose.model("users", userSchema);

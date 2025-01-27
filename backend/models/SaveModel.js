import mongoose from 'mongoose';

const Saveschema=mongoose.Schema({
UserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
},
savedPosts:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
}

})

export default mongoose.model("save",Saveschema)
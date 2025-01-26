import mongoose from "mongoose"
const SavedSchema=mongoose.Schema({
    Post:{
type:mongoose.Schema.Types.ObjectId,
ref:'Post',
required:true
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
})

export default mongoose.model('saved',SavedSchema)
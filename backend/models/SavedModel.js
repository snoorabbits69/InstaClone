const mongoose=require("mongoose")

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

module.exports=mongoose.model('saved',SavedSchema)
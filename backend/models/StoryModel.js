const { mongoose } = require("mongoose");

const StorySchema=mongoose.Schema({
    postedBy:{
        type:String,
        required:true
    },
image:{
    type:String,
    required:true
},
expiresAt:{
    type:Date,
    required:true,
    expires:'60m'
}

},{
    timestamps:true
})
module.exports=mongoose.model("story",StorySchema);
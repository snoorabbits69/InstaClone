import mongoose from "mongoose";
const SaveSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  
        required: true
    },
    savedPost: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",  
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Save", SaveSchema);

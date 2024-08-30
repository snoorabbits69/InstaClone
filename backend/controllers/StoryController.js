const Story = require("../models/StoryModel");
const { upload } = require("../Multer/multer");
const { bucket } = require("../firebase/firebase");
const sharp = require("sharp");

module.exports.uploadStory = async (req, res, next) => {
    const expirationTime = new Date();
    // expirationTime.setMinutes(expirationTime.getMinutes() + 400);

    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.json({ error: "Error uploading file" });
        }

        try {
            const optimizedFile = await sharp(req.file.buffer)
                .resize(400, 800, { fit: 'cover' })
                .webp()
                .toBuffer();
            
            const originalName = req.file.originalname.substring(0, req.file.originalname.lastIndexOf("."));
            const filename = Date.now() + originalName + ".webp";

            const file = bucket.file("stories/" + filename);
            await file.createWriteStream().end(optimizedFile);

            const newStory = await Story.create({
                postedBy: req.params.postedBy,
                image: `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/stories%2F${filename}?alt=media`,
                expiresAt: expirationTime
            });

            DeleteFile(filename); // Schedule file deletion

            return res.json({ story: newStory });
        } catch (e) {
            return res.json({ error: e.message });
        }
    });
}

const DeleteFile = async (filename) => {
setTimeout(async () => {
        try {
            await bucket.file("stories/" + filename).delete();
            console.log("Deletion Success");
        } catch (e) {
            console.log("Error deleting file:", e);
        }
    }, 60*60*1000);
}

module.exports.deleteStory = async (req, res) => {
    try {
      const storyId = req.params.storyid;
      const storyToDelete = await Story.findById(storyId);
  
      if (storyToDelete) {
        const imageUrl = storyToDelete.image.substring(storyToDelete.image.lastIndexOf("/") + 11, storyToDelete.image.lastIndexOf("?"));
  
      
         await storyToDelete.deleteOne(),
          await bucket.file(imageUrl).delete()

  
        return res.json({ msg: "Deletion successful" });
      } else {
        return res.status(404).json({ error: "Story not found" });
      }
    } catch (e) {
        console.log(e);
      return res.status(500).json({ error: "An error occurred during deletion" });
    }
  };
  
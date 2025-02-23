import User from "../models/UserModel.js"
export const AcceptMiddleWare = async (req, res, next) => {
    try {
      const followingUser = await User.findById(req.params.id);
      if (!followingUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const updatedRequests = followingUser.Account.Requests.filter(id => id !== req.body.id);
      followingUser.Account.Requests = updatedRequests;
  
      await followingUser.save();
     
      next();
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  };
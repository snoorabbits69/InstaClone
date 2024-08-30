const User=require("../models/UserModel")
module.exports.ReqMiddleWare = async (req, res, next) => {
    try {
      const followingUser = await User.findById(req.params.id);
      if (!followingUser) {
        return res.status(404).send({ message: 'User not found' });
      }
      if (followingUser.Account.private) {
        const requestingUser = await User.findById(req.body.id);
        const alreadyinrequest=followingUser.Account.Requests.some((request)=>{
          return request.id.toString() ==req.body.id
        })
       const {Password:_,...rest}=followingUser.toObject();
        if(alreadyinrequest){
          console.log("already in request");
          console.log(rest);
          return res.status(200).json({ message: 'Request had been sent' });
        }
        else{
        followingUser.Account.Requests.push({ id: req.body.id });
        await followingUser.save();
        const{Password:_,...rest}=followingUser.toObject();
        return res.status(200).json({ message: 'Request has been sent',user:rest });
  
        }
       
      }
      
      else {
        console.log("follow");
        next();
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };
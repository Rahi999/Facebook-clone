const {PostModel} = require("../models/Post");
const {userModel} = require("../models/userAuth");

const createPost = async (req, res) => {
    try{
        const post = await new PostModel(req.body).save();
        await post.populate("user", "firstname surename profile_pic cover_pic");
        return res.status(200).json({message: "OK", post: post})
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

const getAllPosts = async (req, res) => {
    try{
        const getPosts = await PostModel.find({})
        .populate('user', "firstname surename profile_pic")
        .populate({path: "comments", populate: {path: 'user', model: 'user', select: "firstname surename profile_pic"}})
        .sort({"createdAt": -1});
        return res.status(200).json(getPosts)
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

const addComment = async (req, res) => {
    try {
      const { comment, image, postId } = req.body;
      let newComments = await PostModel.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comment: comment,
              image: image,
              user: req.body.user,
              commentAt: new Date(),
            },
          },
        },
        {
          new: true,
        }
      ).populate("comments.user", "profile_pic firstname surename");
      res.json(newComments.comments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
module.exports = {createPost, getAllPosts, addComment}
const {PostModel} = require("../models/Post");
const {userModel} = require("../models/userAuth");

const createPost = async (req, res) => {
    try{
        const {content} = req.body;
        console.log(content)
        console.log(req.files)
        let imagesUrl = [];
        if(req.files.length){
            req.files.map(file => {
                imagesUrl.push(`${req.protocol}://${req.get("host")}/public/uploads/${file.filename}`);
            })
        }
        if(!content) return res.status(403).json({message:"please add some content !!"});
        const newPost = new Post({...req.body, images:imagesUrl , lang:arabic.test(content) ? "AR" :"EN" , user:req.user._id});
        if(!newPost) return res.status(500).json({message:"smothing went wrong !!"});
        //save post in db
        await newPost.save();
        // to get get user data 
        let fullPost = await newPost.populate('user',"username profile_pic")
        return res.status(200).json(fullPost);
        // const post = await new PostModel(req.body).save();
        // await post.populate("user", "firstname surename profile_pic cover_pic");
        // return res.status(200).json({message: "OK", post: post})
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
    try{
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}
module.exports = {createPost, getAllPosts, addComment}
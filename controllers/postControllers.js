const Post = require("../models/postModel")
const post = require("../models/postModel")
exports.getAllPosts = async (res,req,next) =>{
    try {
        const posts = await Post.find();

        res.status(200).json({
            status: 'success',
            results: posts.length,
            data:{
                posts,
            },
        });
    } catch (e){
        res.status(400).json({
            status: "fail",
        });
    }
};

exports.getOnePost = async (res,req,next) =>{
    try {
        const posts = await Post.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data:{
                post,
            },
        });
    } catch (e){
        res.status(400).json({
            status: "fail",
        });
    }
};
exports.createPost = async (res,req,next) =>{
    try {
        const posts = await Post.create(req.body);

        res.status(200).json({
            status: 'success',
            data:{
                post,
            },
        });
    } catch (e){
        res.status(400).json({
            status: "fail",
        });
    }
};

exports.updatePost = async (res,req,next) =>{
    try {
        const posts = await Post.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: 'success',
            data:{
                post,
            },
        });
    } catch (e){
        res.status(400).json({
            status: "fail",
        });
    }
};

exports.deletePost = async (res,req,next) =>{
    try {
        const posts = await Post.findByIdAndDelete(re.params.id);

        res.status(200).json({
            status: 'success',
        });
    } catch (e){
        res.status(400).json({
            status: "fail",
        });
    }
};

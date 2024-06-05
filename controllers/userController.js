const User = require('../models/User');
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');

// creating a user 
const createUser = async(req,res)=>{
    try {
        let createdData;
            if(!req.body.name){
                return res.status(500).json({message:"Name can not be empty"})
            }
            if(!req.body.email){
                return res.status(500).json({message:"Email can not be empty"})
            }
            if(!req.body.gender){
                return res.status(500).json({message:"Phone number can not be empty"})
            }
            const userExist = await User.findOne({ email: req.body.email }).lean();
            if (userExist) {
                return res.status(200).json({
                    status: false,
                    message: `${req.body.email} is already exist`
                })
            }
                createdData = await new User(req.body);
                createdData.save()
            if (createdData) {
                res.status(200).json({
                    status: true,
                    message: `Created Successfully`,
                    token:await createdData.generateToken()
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: `Created unSuccessfully`
                })
            }
    } catch (error) {
        res.status(500).json({status: false,message: `Created unSuccessfully`
        })
    }

}

// store commnet by user
const createComment = async(req,res)=>{
    try {
        let addComment;
        const checkUserExist = await User.find({_id:req.params.userId});
        if(!checkUserExist){
            return res.status(200).json({ status: false,message: `User Not exist`})
        }
        if(!req.body.text){
            return res.status(404).json({message:`Comment not found`})
        }else{
            req.body.author = req.params.userId
            addComment = await new Comment(req.body);
            addComment.save()
        if (addComment) {
            res.status(200).json({
                status: true,
                message: `Commnet Added`,
                data:addComment
            })
        } else {
            res.status(404).json({
                status: false,
                message: `Commnet Not Added`
            })
        }
        }
     
    } catch (error) {
        res.status(500).json({status: false,message: `Server Error`
        })
    }
}


// store replies to that comment
const createReply = async(req,res)=>{
    try {
        let addReply;
        const checkCommentExist = await Comment.find({_id:req.params.id});
        if(!checkCommentExist){
            return res.status(200).json({ status: false,message: `Comment Not FOund`})
        }else{
            req.body.commentId = req.params.id;
            req.body.userId = req.params.userId;
            addReply = await new Reply(req.body);
            addReply.save()
        if (addReply) {
            res.status(200).json({
                status: true,
                message: `Reply Added`,
                data:addReply
            })
        } else {
            res.status(404).json({
                status: false,
                message: `Reply Not Added`
            })
        }
        }
     
    } catch (error) {
        res.status(500).json({status: false,message: `Server Error`
        })
    }
}

// Get all comments by user
const allCommentsByUser = async(req,res)=>{
    try {
        const existUser = await User.find({_id:req.params.userId});
        if(!existUser){
            return res.status(200).json({ status: false,message: `User Not FOund`})
        }else{
            const allComments = await Comment.find({author:req.params.userId}).lean();
            return res.status(200).json({ status: true,message: `Comments found`,data:allComments})
        }
     
    } catch (error) {
        res.status(500).json({status: false,message: `Server Error`
        })
    }
}

// get all replies of that comment
const allRepliesByCommnet = async(req,res,next)=>{
    try {
        const existComment = await Comment.findOne({_id:req.params.commentId});
        if(!existComment){
            return res.status(200).json({ status: false,message: `Comment Not Found`})
        }else{
            const allReplies = await Reply.find({commentId:req.params.commentId}).lean();
            return res.status(200).json({ status: true,message: `Replies found for ${existComment.text}`,data:allReplies})
        }
     
    } catch (error) {
        res.status(500).json({status: false,message: `Server Error`})
    }
}

// update the comment
const updateExistComment = async(req,res,next)=>{
    try {
        const existComment = await Comment.findOne({_id:req.params.commentId});
        if(!existComment){
            return res.status(200).json({ status: false,message: `Comment Not Found`})
        }else{
            if(!req.body.text){
                return res.status(500).json({message:"Comment can not be empty"})
            }
            const updateComment = await Comment.updateOne({_id:req.params.commentId},{$set:{text:req.body.text}}).exec();
            return res.status(200).json({ status: true,message: `Comment Updated`})
        }
     
    } catch (error) {
        res.status(500).json({status: false,message: `Server Error`})
    }
}

// delete commnet
const deleteComment = async(req,res,next)=>{
    try {
        const existComment = await Comment.findOne({_id:req.params.commentId});
        if(!existComment){
            return res.status(200).json({ status: false,message: `Comment Not Found`})
        }else{
            await Comment.findByIdAndDelete({_id:req.params.commentId}).exec();
            const checkInReply = await Reply.find({commentId:req.params.commentId}).lean();
            if(checkInReply){
                await Reply.deleteMany({commentId:req.params.commentId}).exec();
            }

            return res.status(200).json({ status: true,message: `Comment Deleted`})
        }
     
    } catch (error) {
        res.status(500).json({status: false,message: `Server Error`})
    }
}





module.exports = {createUser,createComment,createReply,allCommentsByUser,allRepliesByCommnet,updateExistComment,deleteComment}
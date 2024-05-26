const User = require('../models/User');


// create user form
const createUserForm = async(req,res)=>{
    try {
        if(!req.body.title){
            return res.status(500).json({message:"Title can not be empty"})
        }
        const titleCreated = await new User(req.body);
        const result = titleCreated.save()
        if (result) {
            res.status(200).json({
                data:result,
                message: `${req.body.title} Created Successfully`
            })
        } else {
            res.status(500).json({
                status: false,
                message: `${req.body.title} Created unSuccessfully`
            })
        }
    } catch (error) {
        res.status(500).json({status: false,message: `${req.body.title} Created unSuccessfully`})
    }

}

// creating a user 
const createUser = async(req,res)=>{
    try {
        const checkTitleExist = await User.findOne({title:req.query.form_title});
        console.log(checkTitleExist);
        if(checkTitleExist===null || checkTitleExist===undefined){
            return res.status(500).json({message:`${req.query.form_title} title not found`})
        }else{
            if(!req.body.name){
                return res.status(500).json({message:"Name can not be empty"})
            }
            if(!req.body.email){
                return res.status(500).json({message:"Email can not be empty"})
            }
            if(!req.body.phonenumber){
                return res.status(500).json({message:"Phone number can not be empty"})
            }
            const userExist = await User.findOne({ email: req.body.email }).lean();
            if (userExist) {
                return res.status(200).json({
                    status: false,
                    message: `${req.body.email} is already exist`
                })
            }
            const userCreated = await User.updateOne({ title: req.query.form_title }, req.body, { new: true }).exec();
            if (userCreated) {
                res.status(200).json({
                    status: true,
                    message: `${req.query.form_title} details Created Successfully`
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: `${req.query.form_title} details Created unSuccessfully`
                })
            }
        }
     
    } catch (error) {
        res.status(500).json({status: false,message: `${req.query.form_title} details Created unSuccessfully`
        })
    }

}

// 
const getUser = async(req,res)=>{
    try {
        const checkTitleExist = await User.find({title:req.query.form_title});
        console.log(checkTitleExist);
        if(checkTitleExist===null || checkTitleExist===undefined){
            return res.status(500).json({message:`${req.query.form_title} title not found`})
        }else{
            const getUsersBytitle = await User.find({ title: req.query.form_title }).lean();
            if (getUsersBytitle) {
                res.status(200).json({
                    data:getUsersBytitle,
                    status: true,
                    message: `${req.query.form_title} details fetch Successfully`
                })
            } else {
                res.status(500).json({
                    data:[],
                    status: false,
                    message: `${req.query.form_title} details fetch unSuccessfully`
                })
            }
        }
     
    } catch (error) {
        res.status(500).json({status: false,message: `${req.body.title} details fetch unSuccessfully`
        })
    }
}


module.exports = {createUserForm,createUser,getUser}
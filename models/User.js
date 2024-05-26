const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    title:{type:String},
    name:{type:String,default:""},
    email:{type:String,unique:true,default:""},
    phonenumber:{type:Number,default:""},
    isGraduate:{type:Boolean,default:true},
})

module.exports = model('User',userSchema)
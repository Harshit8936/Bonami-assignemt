const {Schema,model} = require('mongoose');

const commentSchema = new Schema({
    text:{type:String},
    author:{type:Schema.ObjectId},
    date:{type:Date,default:Date.now()},
})

module.exports = model('Comment',commentSchema)
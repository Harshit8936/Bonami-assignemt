const {Schema,model} = require('mongoose');

const replySchema = new Schema({
    reply:{type:String},
    commentId:{type:Schema.ObjectId},
    userId:{type:Schema.ObjectId},
    date:{type:Date,default:Date.now()},
})

module.exports = model('Reply',replySchema)
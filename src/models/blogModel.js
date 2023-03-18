const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const BlogSchema = new mongoose.Schema( {
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    }, 
    authorId: {
        type: ObjectId,
        ref: "Author",
        required:true, 
    }, 
    isDeleted: {
        type:Boolean, 
        default: false
    }, 
},{ timestamps: true });


module.exports = mongoose.model('Blog', BlogSchema)
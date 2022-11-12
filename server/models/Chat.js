const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    userIds:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    allMessages:[{
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        message:{
            type:String
        },
        isImage:{
            type:Boolean,
            default:false
        },
        time:{
            type:String
        }
    }]
},{timestamps:true})


module.exports=mongoose.model("chat",chatSchema);
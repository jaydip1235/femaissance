const Chat=require('../models/Chat');
const User = require('../models/User');

//Create chat
exports.createChat=async(req,res)=>{
    try {
        const {user1,user2}=req.body;
        let chat=await Chat.findOne({$and:[{userIds:{$all:[user1,user2]}}]});
        if(!chat) {
            chat=new Chat({userIds:[user1,user2]});
            await chat.save();
        }
        if(chat) res.status(201).send(chat._id);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}


//Fetch a particular chat
exports.getAChat=async(req,res)=>{
    try {
        const {roomId}=req.params;
        let chat=await Chat.findOne({_id:roomId});
        console.log(chat);
        res.status(200).send(chat);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}
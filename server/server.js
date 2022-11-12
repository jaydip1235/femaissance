const express=require('express');
const app=express();
require('dotenv').config({path:'config.env'});
const bodyParser=require('body-parser');
const morgan=require('morgan');
const cors=require('cors');
const path=require('path');
const Chat=require('./models/Chat');
const moment=require('moment');

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}));

app.use(cors());
app.use(morgan("dev"));

require('./db/conn');

const port=process.env.PORT || 5000;

app.use('/api/user',require('./routes/pubUserRou'));
app.use('/api/user',require('./routes/privUserRou'));
app.use('/api/category',require('./routes/categoryRou'));
app.use('/api/posts',require('./routes/postRou'));
app.use('/api/posts',require('./routes/commentRou'));
app.use('/api/chat',require('./routes/chat'));


const server=app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
const io=require('socket.io')(server,
    {
        cors: {
          origin: ["http://localhost:3000","https://femaissance.netlify.app"],
          methods: ["GET", "POST"]
        }
    });
    

io.on("connection",(socket)=>{
    console.log("Connected to socket!");
    socket.on('joined',({userId,roomId})=>{
        // console.log(roomId);
        socket.join(roomId);
    })
    socket.on("sendmessage",async({userId,roomId,message,isImage})=>{
        const chat=await Chat.findOneAndUpdate({_id:roomId},{
            $push:{
                allMessages:{senderId:userId,message,time:moment().format(),isImage}
            }
        },{new:true})
        console.log(userId);
        // const messages=await Message.find(,);
        // socket.to().emit("sendallmessages",{allMessages:chat.allMessages});
        io.to(roomId).emit("sendallmessages",{allMessages:chat.allMessages});
    })
})
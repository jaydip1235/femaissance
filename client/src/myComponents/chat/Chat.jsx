// import { Flex,useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import Divider from "../components/Divider";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import Messages from "../components/Messages";
import socket from "../../socket";
import { useLocation, useParams } from 'react-router-dom';
// import Nav from "./Nav";
import axios from "axios";
import './chat.css';


const Chat = () => {

  const [messages, setMessages] = useState([]);

  const { state } = useLocation();

  const [inputMessage, setInputMessage] = useState("");

  const [otherUserName,setOtherUserName]=useState("");
//   const [otherUser, setOtherUser] = useState("");
  let { roomId, currId, otherId } = useParams();
  console.log(currId);
  let userId = currId;
  const getMessages = async () => {
    try {
      const { data } = await axios.get(`https://femaissance.herokuapp.com/api/chat/get/${roomId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("fmToken")}`
        }
      });
      setMessages(data.allMessages);
      const res=await axios.get(`https://femaissance.herokuapp.com/api/user/getotheruser/${otherId}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("fmToken")}`
        }
      });

      setOtherUserName(res.data.username);

    //   await axios.post('https://femaissance.herokuapp.com/api/private/informuser',{roomId,currId,otherId},{
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${localStorage.getItem("fmToken")}`
    //     }
    //   });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMessages();
    // axios.get(`https://femaissance.herokuapp.com/api/private/getanuser/${otherId}`,{
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${localStorage.getItem("clgToken")}`
    //   }
    // }).then(({data})=>setOtherUser(data)).catch((err)=>console.log(err));
  }, [])

  useEffect(() => {
    socket.emit('joined', { userId, roomId });
  }, [])
  useEffect(() => {
    socket.on("sendallmessages", ({ allMessages }) => {
      setMessages(allMessages);
      console.log(allMessages);
    })
  }, [])

  const send = (e) => {
    e.preventDefault();
    socket.emit("sendmessage", { userId, roomId, message: inputMessage });
    setInputMessage("");
  }

  const handleSendMessage = () => {
    socket.emit("sendmessage", { userId, roomId, message: inputMessage });
    setInputMessage("");
  };


  return (
    <>
    {/* <Nav/>
    <Flex w="100%" h="100vh" justify="center" align="center"        bg={useColorModeValue("orange.100", "orange.900")}
          css={{
            backgroundImage: useColorModeValue(CONFETTI_LIGHT, CONFETTI_DARK),
            backgroundAttachment: "fixed",
          }}
    >
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
        <Header otherUser={otherUser} />
        <Divider />
        <Messages messages={messages} currId={currId} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}

        />
      </Flex>
    </Flex> */}


<div className="body">
<div className="chat-div">
        <div className="messages">
            {
                messages.length>0
                ?
                messages.map((mes,ind)=>{
                    return  <div className={mes.senderId===userId?"sent-message":"received-message"} key={ind} >{mes.senderId===userId?"You":otherUserName}: {mes.message}</div>
            
                })
                :
                null
            }
        </div>
        <form className="chat-input-div">
            <input type="text" className="message-inp" placeholder="Type a message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
            <button type="submit" className="message-btn" onClick={send}>Send</button>
        </form>
    </div>
</div>
     </>
  );
};

export default Chat;
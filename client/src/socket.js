import { io } from "socket.io-client";

const socket =io('https://femaissance.herokuapp.com/',{
  reconnection:false
});

export default socket;
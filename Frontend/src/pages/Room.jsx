import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const Room = () => {
  const params = useParams();
  const { roomId } = params;

  const [roomData, setroomData] = useState({});
  const [socket, setsocket] = useState(null)
  const [message, setmessage] = useState('')
  const [messages, setmessages] = useState([])



  const appendMessage = (msg)=>{
    const temp = messages
    temp.push(msg)
    
    setmessages([...temp])
  }

  useEffect(() => {
    getroomData();

    const temp = io("http://localhost:3000", {
      query: {
        roomId: roomId,
      },
    });

    temp.on("message", (msg)=>{
        console.log(msg);
        appendMessage(msg)
    })

    setsocket(temp)

  }, []);

  const getroomData = async () => {
    await axios
      .get(`http://localhost:3000/api/rooms/${roomId}`)
      .then((res) => {
        setroomData(res.data.room);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen w-full bg-gray-300 flex ">
      <div className="relative h-full w-[35%] bg-red-100 flex justify-between">
        {/* <h1 className='bg-green-700 h-auto'>back</h1> */}
        <h1 className="p-4 text-2xl font-semibold">{roomData?.roomName}</h1>
      </div>

      <div className="h-full w-[65%] bg-blue-100 p-2.5 relative">
        {
            messages.map((elem , index)=>{
                return <h1 className="mb-1.5">{elem}</h1>
            })
        }

        <div className="absolute bottom-3 flex w-[98%]">
          <input 
            value={message}
            onChange={(e)=>{
                setmessage(e.target.value)
            }}
          type="text" className="border  w-[90%] p-2" />

          <i 
          onClick={()=>{
            appendMessage(message)
            socket.emit("chacha", message)
            setmessage("")
          }}
          className="ri-send-plane-fill text-4xl"></i>
        </div>
      </div>
    </div>
  );
};

export default Room;

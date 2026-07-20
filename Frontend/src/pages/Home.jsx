import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [roomData, setroomData] = useState([])
  const [roomName, setroomName] = useState("")

  useEffect(() => {
    getAllrooms()
  }, [])
  

  const navigate = useNavigate()


  const getAllrooms = async ()=>{
       await axios.get("https://socket-io-ktu1.onrender.com/api/rooms/allrooms")
       .then((res)=>{
            console.log(res.data.rooms);
            setroomData(res.data.rooms)
       })
       .catch((err)=>{
             console.log(err);
        
       })
  }

  const createRoom = async ()=>{
    await axios.post("https://socket-io-ktu1.onrender.com/api/rooms/create", {roomName})
    .then((res)=>{
        console.log(res);
        getAllrooms()
    })
    .catch((err)=>{
        console.log(err);
        
    })
  }

  return (
    <div className="h-screen bg-gray-200 p-8">
      <h1 className="text-2xl underline ">all room data</h1>
      <br />
      <button
      onClick={()=>{
        setisOpenModal(!isOpenModal)
      }}
      className="border py-1 px-3 rounded bg-green-300 cursor-pointer">
        Create room
      </button>
      <br />
      <br />

      {
        roomData.map((elem , index)=>{
            return <li>
                <ul> <button 
            onClick={()=>{
                navigate(`/room/${elem._id}`)
            }}
            >{elem.roomName}</button></ul>
            </li>
        })
      }




      {isOpenModal && <div className="absolute flex justify-center items-center flex-col h-screen w-full bg-gray-300 opacity-70 top-0 left-0">
           <button
             onClick={()=>{
        setisOpenModal(!isOpenModal)
      }}
            className="absolute top-4 left-4 border bg-red-500 p-1.5 text-xl">cancel</button>
           
            <input
            value={roomName}
            onChange={(e)=>{
                setroomName(e.target.value)
            }}
            type="text" className="border p-2" />

            <button
            onClick={()=>{
                createRoom()
                setisOpenModal(!isOpenModal)
            }}
            className=" border mt-3.5 bg-green-500 p-1.5 text-xl">Create room</button>
        </div>}
    </div>
  );
};

export default Home;

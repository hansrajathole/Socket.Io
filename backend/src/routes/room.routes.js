

import express from 'express'
import roomModel from '../models/room.model.js'


const router = express.Router()

router.get("/allrooms", async (req, res)=>{

    console.log(req);
    
    const rooms = await roomModel.find()

    res.status(200).json({message : "all rooms", rooms})
})

router.post("/create", async (req, res)=>{
    console.log(req.body);
    
    const {roomName}= req.body

    if(!roomName){
        return res.status(400).json({message : "roomName is required"})
    }

    const room = await roomModel.create({
        roomName 
    })

    res.status(201).json({message : "room created successfully", room})

})


router.get("/:roomId",async(req,res)=>{

   const {roomId} = req.params
    console.log(roomId);
    
   const room = await roomModel.findById(roomId)

   res.status(200).json({message :"room data found", room})
})

export default router
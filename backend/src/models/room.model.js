

import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({
    roomName : {
        type : String,
        required : true
    }
})


const roomModel = mongoose.model("room",roomSchema)
export default roomModel
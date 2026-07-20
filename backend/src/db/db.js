import mongoose from 'mongoose'


const connect = async()=>{
    await mongoose.connect("mongodb+srv://kumarachintya700_db_user:RgUEJLMbN4NPJmSV@cluster0.g4fah6q.mongodb.net/socket")
     .then(()=>{
        console.log("database connected..");
        
     })
     .catch((err)=>{
        console.log(err);
        
     })
}


export default connect
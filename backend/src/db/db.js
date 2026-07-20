import mongoose from 'mongoose'


const connect = async()=>{
    await mongoose.connect("mongodb://localhost:27017/socket")
     .then(()=>{
        console.log("database connected..");
        
     })
     .catch((err)=>{
        console.log(err);
        
     })
}


export default connect
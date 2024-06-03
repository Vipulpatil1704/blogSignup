const mongoose=require("mongoose");

async function mongodb(){
    try{
        await mongoose.connect('mongodb+srv://roboticDashboard:roboticDashboard@cluster0.kjbaxvg.mongodb.net/roboticUser?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Mongodb connected");
    }
    catch(e){
        throw new Error({error:"There is some Problem in mongodb connection."})
    }
}  
module.exports=mongodb;
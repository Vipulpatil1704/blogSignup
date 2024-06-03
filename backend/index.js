const express=require("express");
const app=express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors=require("cors");
const mongodb=require("./db");
//middleware to parese json bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'] // Allow these HTTP methods
}));
mongodb();
app.use("/api",require("./Routes/authRoute"));
app.listen(process.env.PORT,()=>{
    `server is running on port ${process.env.PORT}`
});
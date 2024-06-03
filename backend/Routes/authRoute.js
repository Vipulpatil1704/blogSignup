const express = require("express");
const path = require("path")
const app = express();
const router = express.Router();
const User = require("../Models/User")
const Post =require("../Models/Post")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer')
const uploadsDir = path.join(__dirname, '..', 'uploads');
require("dotenv").config();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
const { body, validationResult } = require("express-validator");
const handleError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Handle multer-specific errors
        return res.status(400).json({ errors: [{ msg: `Multer error: ${err.message}` }] });
    } else if (err) {
        // Handle other errors
        return res.status(500).json({ errors: [{ msg: `Server error: ${err.message}` }] });
    }
    next();
};
// Simulated function to send a welcome email
function sendWelcomeEmail(email) {
    console.log(`Sending welcome email to ${email}`);
    console.log("Welcome email sent successfully!");
}
function authenticateToken(req,res,next){
    const token = req.headers['authorization'];
    if(token==null){
        return res.sendStatus(401);
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user;  
        next();
    })
}
router.post("/signup", [(req, res, next) => {
    upload.single('profilePicture')(req, res, function (err) {
        if (err) {
            return handleError(err, req, res, next);
        }
        next();
    });
}, body('email').isEmail(), body('username').isLength({ min: 5 }), body('password').isLength({ min: 5 })], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const profilePicture = req.file;
    const { email, username, password, profileName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            email: email,
            username: username,
            password: hashedPassword,
            profileName: profileName,
            profilePicture: profilePicture.path
        })
        // Simulated sending welcome email
        sendWelcomeEmail(user.email);
        const token=jwt.sign({user:user},process.env.JWT_SECRET);
        res.status(201).json({ message: "User created Successfully",token:token});
    }
    catch (e) {
        const keys = Object.keys(e.keyValue);
        res.status(500).json({ e: "failed to create user", key: keys[0] })
    }
})
// const post=[
//     {
//       "title": "Post 1",
//       "content": "Content of Post 1"
//     },
//     {
//       "title": "Post 2",
//       "content": "Content of Post 2"
//     },
//     {
//       "title": "Post 3",
//       "content": "Content of Post 3"
//     },
//     {
//       "title": "Post 4",
//       "content": "Content of Post 4"
//     },
//     {
//       "title": "Post 5",
//       "content": "Content of Post 5"
//     },
//     {
//       "title": "Post 6",
//       "content": "Content of Post 6"
//     },
//     {
//       "title": "Post 7",
//       "content": "Content of Post 7"
//     },
//     {
//       "title": "Post 8",
//       "content": "Content of Post 8"
//     },
//     {
//       "title": "Post 9",
//       "content": "Content of Post 9"
//     },
//     {
//       "title": "Post 10",
//       "content": "Content of Post 10"
//     },
//     {
//       "title": "Post 11",
//       "content": "Content of Post 11"
//     },
//     {
//       "title": "Post 12",
//       "content": "Content of Post 12"
//     },
//     {
//       "title": "Post 13",
//       "content": "Content of Post 13"
//     },
//     {
//       "title": "Post 14",
//       "content": "Content of Post 14"
//     },
//     {
//       "title": "Post 15",
//       "content": "Content of Post 15"
//     },
//     {
//       "title": "Post 16",
//       "content": "Content of Post 16"
//     },
//     {
//       "title": "Post 17",
//       "content": "Content of Post 17"
//     },
//     {
//       "title": "Post 18",
//       "content": "Content of Post 18"
//     },
//     {
//       "title": "Post 19",
//       "content": "Content of Post 19"
//     },
//     {
//       "title": "Post 20",
//       "content": "Content of Post 20"
//     },
//     {
//       "title": "Post 21",
//       "content": "Content of Post 21"
//     },
//     {
//       "title": "Post 22",
//       "content": "Content of Post 22"
//     },
//     {
//       "title": "Post 23",
//       "content": "Content of Post 23"
//     },
//     {
//       "title": "Post 24",
//       "content": "Content of Post 24"
//     },
//     {
//       "title": "Post 25",
//       "content": "Content of Post 25"
//     },
//     {
//       "title": "Post 26",
//       "content": "Content of Post 26"
//     },
//     {
//       "title": "Post 27",
//       "content": "Content of Post 27"
//     },
//     {
//       "title": "Post 28",
//       "content": "Content of Post 28"
//     },
//     {
//       "title": "Post 29",
//       "content": "Content of Post 29"
//     },
//     {
//       "title": "Post 30",
//       "content": "Content of Post 30"
//     },
//     {
//       "title": "Post 31",
//       "content": "Content of Post 31"
//     },
//     {
//       "title": "Post 32",
//       "content": "Content of Post 32"
//     },
//     {
//       "title": "Post 33",
//       "content": "Content of Post 33"
//     },
//     {
//       "title": "Post 34",
//       "content": "Content of Post 34"
//     },
//     {
//       "title": "Post 35",
//       "content": "Content of Post 35"
//     },
//     {
//       "title": "Post 36",
//       "content": "Content of Post 36"
//     },
//     {
//       "title": "Post 37",
//       "content": "Content of Post 37"
//     },
//     {
//       "title": "Post 38",
//       "content": "Content of Post 38"
//     },
//     {
//       "title": "Post 39",
//       "content": "Content of Post 39"
//     },
//     {
//       "title": "Post 40",
//       "content": "Content of Post 40"
//     },
//     {
//       "title": "Post 41",
//       "content": "Content of Post 41"
//     },
//     {
//       "title": "Post 42",
//       "content": "Content of Post 42"
//     },
//     {
//       "title": "Post 43",
//       "content": "Content of Post 43"
//     },
//     {
//       "title": "Post 44",
//       "content": "Content of Post 44"
//     },
//     {
//       "title": "Post 45",
//       "content": "Content of Post 45"
//     },
//     {
//       "title": "Post 46",
//       "content": "Content of Post 46"
//     },
//     {
//       "title": "Post 47",
//       "content": "Content of Post 47"
//     },
//     {
//       "title": "Post 48",
//       "content": "Content of Post 48"
//     },
//     {
//       "title": "Post 49",
//       "content": "Content of Post 49"
//     },
//     {
//       "title": "Post 50",
//       "content": "Content of Post 50"
//     }
//   ]
  
router.get("/post",authenticateToken,async (req,res)=>{
    if(req.user){
        try{
            const response=await Post.find({});
            res.json({result:response});
        }
        catch(e){
            throw new Error("failed to fetch from database");
        }
    }
    if(!req.user){
        res.sendStatus(400);
    }
})
module.exports = router;
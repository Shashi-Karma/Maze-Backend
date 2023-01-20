const express= require("express");
const cors = require("cors")
require('./config');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

const Jwt = require('jsonwebtoken');
const jwtKey='Maze'
const adminController =require('./adminController')
const app = express();
app.use(express.json());
app.use(cors());
app.post("/signup",async (req,resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result},jwtKey,(err,token) => {
        if(err){
            resp.send({result:'Something went wrong'})
        }
       resp.send ({result,auth:token})
    })
})
app.post("/login",async (req,resp)=>{
     console.log(req.body)
     if(req.body.password && req.body.email)
     { 
        let user= await User.findOne(req.body).select("-password");
        if(user)
        {
            Jwt.sign({user},jwtKey,(err,token) => {
                if(err){
                    resp.send({result:'Something went wrong'})
                }
               resp.send ({user,auth:token})
            })
           
        }else{
            resp.send({result:'No User Found'})
        }
     }
})
app.put

app.post("/addpost",verifyToken, async (req,resp)=>{
    let post = new Post(req.body)
    let result = await post.save();
    resp.send(result);
});
app.post("/comments", async (req,resp)=>{
    let comment = new Comment(req.body)
    let result = await comment.save();
    resp.send(result);
});
app.get("/comments",async (req,resp)=>{
    let comments = await Comment.find({user:req.params.id});
    if (comments.length>0){
        resp.send(comments)  
    }else{
        resp.send({result:"No comment Found"})
    }
});
app.get("/posts",async (req,resp)=>{
    let posts = await Post.find({user:req.params.id});
    if (posts.length>0){
        resp.send(posts)  
    }else{
        resp.send({result:"No Post Found"})
    }
});
app.put("/posts/:id",async(req, res)=>{
    try{
    const post = await Post.findById({_id:req.params.id});
    if(!post.likes.includes(req.body.like)){
        await post.updateOne({$push:{like:req.body.like}})
        return res.status(200).json("Post has been liked")  
    }else{
        await post.updateOne({$pull:{like:req.body.like}})
        return res.status(200).json("Post has been disliked")
    }
} catch(error){
    return res.status(500).json("Internal server error")
}
})
// app.put("/posts/:id/dislike",async(req, res)=>{
//     try{
//     const post = await Post.findById({_id:req.params.id});
//     if(!post.dislike.includes(req.body.user)){
//         await post.updateOne({$push:{dislike:req.body.user}})
//         return res.status(200).json("Post has been liked")  
//     }else{
//         await post.updateOne({$pull:{dislike:req.body.user}})
//         return res.status(200).json("Post has been unliked")
//     }
// }catch(error){
//     return res.status(500).json("Internal server error")
// }
// })

app.delete("/posts/:id",async(req, resp)=>{ 
    // try {
    //     const post = await Post.findById({_id:req.params.id});
    //     if (post.userId === req.body.userId) {
    //       await Post.deleteOne();
    //       resp.status(200).json("the post has been deleted");
    //     } else {
    //       resp.status(403).json("you can delete only your post");
    //     }
    //   } catch (err) {
    //     resp.status(500).json(err);
    //   }
   
    const result = await Post.deleteOne({_id:req.params.id})
    resp.send(result);
})

function verifyToken(req, resp, next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        console.warn("middleware called", token)
        Jwt.verify(token, jwtKey, (err,valid)=>{
            if (err) {
                resp.status(401).send({result: "Please provide valid token"})
            }else{
                next();
            }
        })
       
    }else{
        resp.status(403).send({result: "Please add token with header"})
    }
    //console.warn("middleware called", token)
  
}
app.get('/admin/admins', adminController.getAdmins)
app.post('/admin/add', adminController.addAdmins)
app.post('/admin/login', adminController.loginAdmin)
app.listen(5000);

// const express= require("express");
// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
// const app = express();
// const connectDB= async ()=>{
//     mongoose.connect('mongodb://localhost:27017/Maze');
//     const UserSchema= new mongoose.Schema({});
//     const User=mongoose.model('User',UserSchema);
//     const data = await User.find();
//     console.warn(data);
// }
// connectDB();
// app.listen(5000);


// const express= require("express");
// require('../Backend/config');
// const User = require('../Backend/User');
// const app = express();
// app.use(express.json());
// app.post("/signup",(req,resp)=>{
//     resp.send(req.body)
// })
// app.listen(5000);
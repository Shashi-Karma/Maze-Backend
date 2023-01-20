const mongoose= require('mongoose');


const postSchema= new mongoose.Schema({
  title: String,
  description: String,
  firstName: String,
  likes: [{type:mongoose.Types.ObjectId,ref:'User'}],
  likes: {
    type: Array,
    default: [],
  },
//   comments:[{type:mongoose.Types.ObjectId,ref:'comments'}],
//   Comment: String,
// comments:[
//         {
//             user:{
//                 type:mongoose.Schema.ObjectId,
            
//         },
//         username:{
//             type:String,
//         }
//     }
// ]

});

module.exports= mongoose.model("posts",postSchema)
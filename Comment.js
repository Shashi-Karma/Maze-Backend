const mongoose= require('mongoose');


const commentSchema= new mongoose.Schema({
 
  Comment: String,
  body: String,
	post_id: String,
	user_id: String
});

module.exports= mongoose.model("Comment",commentSchema)
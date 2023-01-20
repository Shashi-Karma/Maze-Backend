const mongoose= require('mongoose');

// const User = mongoose.model('User',{
//   type: String,
//   status: String,
//   firstName: String,
//   lastName: String,
//   email: String,
//   phone: String,
//   password: String,
//   confirmPassword: String,
//   description: String,
// })
const userSchema= new mongoose.Schema({
  type: String,
  status: String,
  firstName: String,
  lastName: String,
  email: String,
  isAdmin:{
    type:Boolean,
    require:true,
    default:false
  },
  phone: String,
  password: String,
  confirmPassword: String,
  description: String,

});

module.exports= mongoose.model("User",userSchema)

// module.exports = User

// User.create({
//   type:'ADMIN',
//   email:'Shashi@example.com',
//   password:'123',
//   firstName: 'Shashi',
//   lastName: 'Kant',
  
// })
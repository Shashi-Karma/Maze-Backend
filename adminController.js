const User = require('./User')
const jwt = require('jsonwebtoken')
 module.exports.getAdmins= async (req,res)=>{
    const _data = await User.find({})
    if (_data){
        return res.send({code: 200, message:'success' ,data:_data})
    }else{
        return res.send({code:500,message:'Service error'})
    }
 }

 module.exports.addAdmins= async (req,res)=>{
    const{ firstName,lastName,email,phone,password,confirmPassword }= req.body
    const _res = await User.create({firstName,lastName,email,phone,password,confirmPassword})
    if (_res){
        return res.send({code: 200, message:'success' })
    }else{
        return res.send({code:500,message:'Service error'})
    }
 }
 module.exports.loginAdmin= async (req,res)=>{
    const{ email,password}= req.body
    const userExists = await User.findOne({email:email})
    if (userExists){
        if (userExists.password !==password){
            return res.send({code:400, message: 'Email or Password wrong'})
        }
        const _token = jwt.sign(...userExists, 'PRIV_123')
        return res.send({
            code: 200,
            token:_token,
            message:'login success' ,token:_token, type: userExists.type})
    }else{
        return res.send({code:500,message:'Service error'})
    }
 }
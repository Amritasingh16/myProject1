const blogModel= require("../models/blogModel")
const authorModel= require("../models/authorModel")
const isValidRequest= require("../validators/validation")

const createBlog= async function(req, res){
    try{
    let _id=req.body.authorId
    let data =req.body
    const {
        title,body,authorId,tags,category,subcategory
    }= data 
    if(!isValidRequest(data)){
        return res.status(400).send({ msg: "Request body can't be empty"})
    }
    
    const validId= await authorModel.findById({_id:authorId})
    if(validId){
        let saveData= await blogModel.create(data)
        res.status(201).send({ data: saveData })
    }else{
      return res.status(400).send({ msg: "INVALID AuthorId"})
    }
    }
   
catch(err){
    return res.status(500).send({msg:err.message})
}}
module.exports.createBlog=createBlog
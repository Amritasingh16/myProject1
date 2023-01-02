const blogModel= require("../models/blogModel")

const createBlog= async function(req, res){try{
    //let authorId=req.body.authorId
    let data =req.body
    let saveData= await blogModel.create(data)
    res.send({ data: saveData })
}
catch(err){
    return res.status(500).send({msg:err.message})
}}
module.exports.createBlog=createBlog
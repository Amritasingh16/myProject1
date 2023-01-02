const blogModel= require("../models/blogModel")

const createBlog= async function(req, res){
    let data= req.body
    let saveData= await blogModel.create(data)
    res.send({ data: saveData })
}
module.exports.createBlog=createBlog
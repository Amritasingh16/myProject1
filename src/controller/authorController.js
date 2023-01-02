const authorModel= require("../models/authorModel")


const createAuthor= async function(req, res){
    let data= req.body
    let saveData=  await authorModel.create(data)
    res. send({data: saveData})
}
module.exports.createAuthor=createAuthor
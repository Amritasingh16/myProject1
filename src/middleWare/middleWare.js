const jwt= require("jsonwebtoken")


const midWare= async function (req, res, next){
try{
    let header= req.headers["x-auth-token"]
    if(!header){
        return res.status(401).send({Error:"Request is missing an Header"})
    }  next()
    
}catch (error){
    return res.status(500).send({msg: error.message})
}
   
}

const validation= async function( req, res, next){
    let userModify= req.params.users
    let userLogged= req.validToken
    if(userModify!=userLogged.userId){
        return res.send({ status: false, data: "User not Identified"})
    }  next()

}

module.exports.midWare=midWare
module.exports.validation=validation


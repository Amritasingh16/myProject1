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
const authorisation = async function (req, res, next) {
    try{
        
        let blogId = req.params.blogId
        let authorLoggedIn = req.decodedToken.authorId
    
        let findBlog = await blogModel.findById(blogId)

        if(!findBlog)
        {return res.status(404).send("status:false, msg: Author's blog not found")}
        let authorId = findBlog.authorId
        
    
        if (!authorId === authorLoggedIn)
            return res.status(403).send({stauts: false, msg:"User and user's-token in not matched"})
        next()

     }
    catch(error) {
        return res.status(500).send({ status: false, msg: error.message});
    }
    };

module.exports.authorisation = authorisation
module.exports.midWare=midWare
module.exports.validation=validation


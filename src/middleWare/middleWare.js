const jwt= require("jsonwebtoken")
const blogModel= require("../models/blogModel")


const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];

        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "group-18-key");
        req.decodedToken= decodedToken

        if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });
        else {

            next()
        }
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}





const authorisation = async function (req, res, next) {
    try{
        
        let blogId = req.params.blogId
        let authorLoggedIn =req.decodedToken.authorId
    
       let findBlog= await blogModel.findById(blogId)
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

module.exports.authorisation=authorisation
module.exports.authentication=authentication
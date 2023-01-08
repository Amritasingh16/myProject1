
const authorModel = require("../models/authorModel");
const validator = require("../middleware/myMiddleware");
const jwt = require("jsonwebtoken");

//______________________ post api : Create Author ________________________________

const createAuthor = async function (req, res) {
    try {
        const data = req.body;

        if (Object.keys(data).length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "All Field are Mandatory" });
        }

        const { fname, lname, title, email, password } = data;

        if (!validator.isValidName(fname)) {
            return res
                .status(400)
                .send({ status: false, msg: "first name is required" });
        }

        if (!validator.isValidName(lname)) {
            return res
                .status(400)
                .send({ status: false, msg: "last name is required" });
        }

        if (!title) {
            return res.status(400).send({ status: false, msg: "title is required" });
        } else {
            if (title != "Mr" && title != "Mrs" && title != "Miss") {
                return res
                    .status(400)
                    .send({ status: false, msg: "title can be Mr. Miss or Mrs " });
            }
        }

        if (!validator.isValidEmail(email)) {
            return res
                .status(400)
                .send({ status: false, msg: "Please Enter Valid Email Address" });
        }
        const isEmailAlreadyUsed = await authorModel.findOne({ email });
        if (isEmailAlreadyUsed) {
            return res.status(200).send({
                status: false,
                msg: "Oooh...Email already Registered. Please Login...",
            });
        }

        if (!validator.isValidPassword(password)) {
            return res.status(400).send({
                status: false,
                msg: "Password is required and Should Contain Min 8 character and 1 Special Symbol",
            });
        }
        const newAuthor = await authorModel.create(data);

        res.status(201).send({
            status: true,
            msg: "Author Created successfully....",
            data: newAuthor,
        });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message});
}
};
const login= async function(req, res){
    let email= req.body.email
    let password= req.body.password
    let userAccount= await authorModel.findOne({email:email,password:password})
    if(!userAccount){
        return res.status(400).send({status:false, msg:"Email and Password is required"})
    }
    let token= jwt.sign({authorId:userAccount._id.toString()},"group-18-key")
    res.setHeader("x-api-key",token)
    res.status(200).send({ status:true, data: {token} })
}
module.exports.createAuthor=createAuthor
module.exports.login=login





const Author = async function (req, res ){
 try{   

 let data= req.body
 let result= await authorModel.create(data)
  res.status(200).send({status: true, data: result})
 }catch(err){
    res.status(500).send({status: false, msg: err.message})
 } 
}
module.exports.Author=Author
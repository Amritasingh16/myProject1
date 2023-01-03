const blogModel= require("../models/blogModel")
const validator=require('../middleWare/myMiddleware')
const authorModel = require("../models/authorModel");

const createBlog = async function (req, res) {
    try {
        const data = req.body;

        if (Object.keys(data).length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "All Keys are Mandatory" });
        }

        const { title, body, authorId, category } = data;

        if (!title) {
            return res.status(400).send({ status: false, msg: "title is required" });
        }

        if (!body) {
            return res.status(400).send({ status: false, msg: "body is required" });
        }

        if (!validator.isValidObjectId(authorId)) {
            return res
                .status(400)
                .send({ status: false, msg: `${authorId} is not a valid authorId` });
        }

        if (!category) {
            return res
                .status(400)
                .send({ status: false, msg: "category title is required" });
        }
        const author = await authorModel.findById(authorId);
        if (!author) {
            return res
                .status(400)
                .send({ status: false, msg: "author does not exist" });
        }

        const savedData = await blogModel.create(data);
        res.status(201).send({ status: true, data: savedData });
    } catch (err) {
        return res.status(500).send({ status: false, err: err.message });
    }
};

const getBlogs = async function (req, res) {
    try {
        let data = req.query;
        let filter = {
            isdeleted: false,
            isPublished: true,
            ...data,
        };

        const { category, subcategory, tags, authorId } = data;
        if (authorId) {
            console.log(authorId)
            let verifyAuthorId = await blogModel.find({ authorId: authorId });
            if (verifyAuthorId.length == 0) {
                return res
                    .status(400)
                    .send({ status: false, msg: "No blogs in this AuthorId exist" });
            }
        }
        if (category) {
            let verifyCategory = await blogModel.find({ category: category });
            if (verifyCategory.length == 0) {
                return res
                    .status(400)
                    .send({ status: false, msg: "No blogs in this category exist" });
            }
        }

        if (tags) {
            let verifyTags = await blogModel.find({ tags: tags });
            if (verifyTags.length == 0) {
                return res
                    .status(400)
                    .send({ status: false, msg: "No blogs in this tags exist" });
            }
        }

        if (subcategory) {
            let verifySubcategory = await blogModel.find({ subcategory: subcategory });
            if (!verifySubcategory) {
                return res
                    .status(400)
                    .send({ status: false, msg: "No blogs in this Subcategory exist" });
            }
        }

        let getSpecificBlogs = await blogModel.find(filter);

        if (getSpecificBlogs.length == 0) {
            return res
                .status(400)
                .send({ status: false, data: "No blogs can be found" });
        } else {
            return res.status(200).send({ status: true, data: getSpecificBlogs });
        }
    } catch (error) {
        res.status(500).send({ status: false, err: error.message});
}
};
const updateBlog= async function (req, res){
    try{
    let blogId= req.params.blogId
    let modifyData= req.body
    let output= await blogModel.findOneAndUpdate({_id:blogId,isDeleted:false});
     if(!output){
        return res.status(404).send({status: false,data:"Page not Found"})
     }
     if(modifyData.tags){
            modifyData.tags= output.tags.concat(modifyData.tags)
     }
     if(modifyData.subcategory){
           modifyData.subcategory= output.subcategory.concat(modifyData.subcategory)
     }
     if(modifyData.isPublished===true){
        modifyData.publishedAt= moment.format()
     }
     let updateData= await blogModel.findOneAndUpdate({_id:blogId},{$set:modifyData},{new:true})
       res.status(200).send({status: true, data: updateData})
    }catch(error){
        res.status(500).send({ status: false, msg: error.message })
    }
    
}
 
module.exports.updateBlog=updateBlog
module.exports.createBlog=createBlog
module.exports.getBlogs=getBlogs
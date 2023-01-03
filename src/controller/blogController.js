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
module.exports.createBlog=createBlog
const express=require('express')
const router=express.Router()
const authorController=require("../controller/authorController")
const BlogCoontroller=require("../controller/blogController")

router.post("/authors", authorController.createAuthor)
router.post("/blogs", BlogCoontroller.createBlog)
module.exports=router
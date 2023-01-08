const express=require('express')
const router=express.Router()
const authorController=require("../controller/authorController")
const BlogCoontroller=require("../controller/blogController")
const middleware=require("../middleWare/middleWare")
//===========================================PROJECT 1===================================//
router.post("/authors", authorController.createAuthor)

router.post("/blogs", BlogCoontroller.createBlog)

router.post("/login",authorController.login)

router.get("/getBlogs",middleware.authentication,BlogCoontroller.getBlogs)

router.put("/blogs/:blogId",middleware.authentication,middleware.authorization,BlogCoontroller.updateBlog)

router.delete("/blogs/:blogId",middleware.authentication,middleware.authorization,BlogCoontroller.deleteBlog)

router.delete("/blogs",middleware.authentication,middleware.authorization,BlogCoontroller.deleteByQuery)


module.exports=router
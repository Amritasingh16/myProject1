const express=require('express')
const router=express.Router()
const authorController=require("../controller/authorController")
const BlogCoontroller=require("../controller/blogController")
//===========================================PROJECT 1===================================//
router.post("/authors", authorController.createAuthor)

router.post("/blogs", BlogCoontroller.createBlog)

router.post("/login",authorController.login)

router.get('/getBlogs',BlogCoontroller.getBlogs)

router.put("/blogs/:blogId", BlogCoontroller.updateBlog)

router.delete("/blogs/:blogId", BlogCoontroller.deleteBlog)

router.delete("/blogs", BlogCoontroller.deleteByQuery)


module.exports=router
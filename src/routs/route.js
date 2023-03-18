const express = require('express')
const router = express.Router()
const AuthorController = require('../controllers/autherController')
const BlogController = require("../controllers/blogController")
const mw = require('../middlewares/auth')

router.get("/test-me",function(req,res){
    res.send("maari api testing")
})

router.post("/CreateAuthor", AuthorController.createAuthor)
router.post("/loginAuthor", AuthorController.authorlogin)

router.post("/createBlog",mw.auth, BlogController.createBlog)


module.exports = router
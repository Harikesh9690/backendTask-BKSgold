const authorModel = require("../models/autherModel")
const blogModel = require("../models/blogModel")
const mongoose = require('mongoose');


const createBlog = async function (req, res) {
    try {
        let blog = req.body
        let alphabets = /^[A-Z a-z 0-9]{8,30}$/
        if (!blog.title) {
            return res.status(400).send({ status: false, msg: "provide blog title. it's mandatory" })
        }
        if (!alphabets.test(blog.title)) {
            return res.status(400).send({ status: false, msg: "blog title contains only string form" })
        }
        let checktitle = await blogModel.findOne({ title: blog.title })
        if (checktitle) {
            return res.status(400).send({ status: false, msg: "this title is already reserved" })
        }
        if (!blog.content) {
            return res.status(400).send({ status: false, msg: "provide blog body. it's mandatory" })
        }
        if (!blog.authorId) {
            return res.status(400).send({ status: false, msg: "Please provide authorId. it's mandatory" })
        }
        if (!mongoose.Types.ObjectId.isValid(blog.authorId)) {
            return res.status(400).send({ status: false, msg: "AuthorId is not valid,please enter valid ID" })
        }
        let authorbyid = await authorModel.findById(blog.authorId)
        if (!authorbyid) {
            return res.status(400).send({ status: false, msg: "Author is not exist" })
        }
        let blogCreated = await blogModel.create(blog)
       return res.status(201).send({ data: blogCreated })
    }
    catch (err) {
       return res.status(500).send(err.message)
    }
}


module.exports= {createBlog}
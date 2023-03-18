const authorModel = require('../models/autherModel')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const createAuthor = async function (req, res) {
    try {
        let data = req.body
        let passValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/   
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "You have not provided any data" })
        }
        if (!data.name) {
            return res.status(400).send({ status: false, msg: "Please provide name. it's mandatory" })
        }
        if (!data.email) {
            return res.status(400).send({ status: false, msg: "Please provide email" })
        }
        if (!emailValid.test(data.email)) {
            return res.status(400).send({ status: false, msg: "Enter valid email" })
        }
        let author = await authorModel.findOne({ email: data.email })
        if (author) {
            return res.status(400).send({ status: false, msg: "this email is already exist" })
        }
        if (!data.password) {
            return res.status(400).send({ status: false, msg: "Please provide password" })
        }
        if (!passValid.test(data.password)) {
            return res.send({ status: false, msg: "Enter valid password" })
        }
        const salt = await bcrypt.genSalt(12)
        data.password = await bcrypt.hash(data.password, salt)

        let authorData = await authorModel.create(data)
       return res.status(201).send({data:authorData})
    }
    catch (err) {
       return res.status(500).send(err.message)
    }
}

const authorlogin = async function (req, res) {
    try {
        let useraName = req.body.email;
        let password = req.body.password;
        if (!useraName) {
            return res.status(400).send({ status: false, msg: "Please provide email" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "Please provide password" })
        }

        let authorDetails = await authorModel.findOne({ email: useraName.trim() })
        if (authorDetails) {
            let validpassword = await bcrypt.compare(password.trim(), authorDetails.password)
            if (!validpassword) {
              return res.status(401).send({ status: false, message: "Emaild or the password is not correct" });
            }
          } else {
            return res.status(401).send({ status: false, message: "Emaild or the password is not correct" });
          }

        let token = jwt.sign(
            {
                authorId: authorDetails._id.toString(),
                fristBlog: "the moutain"
            }, "this is the secret key of BKS-Gold")
       
        return res.status(200).send({ status: true, token: token });
    } catch (err) {
       return res.status(500).send(err.message)
    }
}


module.exports.createAuthor = createAuthor
module.exports.authorlogin = authorlogin


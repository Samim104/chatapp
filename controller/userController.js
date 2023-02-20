const JWT = require('jsonwebtoken');
const userModel = require('../model/user')
const bcrypt = require('bcrypt');


module.exports = {
    signup : async (req, res) => {
        try {
            const { username, email, password, phone } = req.body
            if (!username || !email || !password || !phone) {
                return res.status(404).json({ message: "username , email , phone number, password is mandatory" })
            }
            let checkUser = await userModel.findOne({ email })
            if (checkUser) {
                return res.status(401).json({ message: "email already exist" })
            }
            checkUser = await userModel.findOne({ phone })
            if (checkUser) {
                return res.status(401).json({ message: "phone number already exist" })
            }
    
            req.body.password = await bcrypt.hash(password, 10);
            const user = userModel.create(req.body);
            if (!user) {
                return res.status(500).json({ message: "internal server error" })
            }
            res.status(200).json({ message: `Hello ${username} thank you for joining us` })
    
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internal server error" })
        }
    },
    login : async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                return res.status(404).json({ message: "email & password is mandatory" })
            }
            const checkUser = await userModel.findOne({ email });
            if (!checkUser) {
                return res.status(404).json({ message: "user not found" })
            }
            const checkPassword = await bcrypt.compare(password, checkUser.password);
            if (!checkPassword) {
                return res.status(401).json({ message: "please enter a valid credentials" })
            }
            let data = {
                id: checkUser.id,
                username: checkUser.username,
                email: checkUser.email,
                phone: checkUser.phone,
            }
            const token = JWT.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.json({ message: "login successfully", token: token })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internal server error" })
        }
    },
    getuser : async (req, res) => {
        try {
            const id = req.params.id
            const user = await userModel.findById(id).select('-password')
            if(!user){
                return res.status(404).json({ message: "user not found" })
            }
            return res.json({data : user})
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "internal server error" })
        }
    }
}
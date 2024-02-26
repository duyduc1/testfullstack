const bcrypt = require('bcrypt');
const user = require("../models/userdb");

exports.postRegister = async (req, res) => {
    const datauser = {
        username: req.body.username,
        email: req.body.email,
        numberphone: req.body.numberphone
    };

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        datauser.password = hashedPassword;
    } catch (error) {
        return res.status(500).send("Đăng ký không thành công");
    }

    const existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(403).send("Email Đã được đăng ký xin vui lòng nhập email khác");
    }

    const newUser = new user(datauser);
    try {
        const result = await newUser.save();
        res.redirect('/page')
    } catch (error) {
        res.status(500).send("Đăng ký không thành công");
    }
};

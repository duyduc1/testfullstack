const User = require('../models/userdb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res) => {
    res.render('login.ejs');
};

exports.postLoginUser = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ username });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {          
            const token = jwt.sign({ userId: user._id, admin: user.admin }, 'your-secret-key', { expiresIn: '1h' });
            user.token = token;
            await user.save();   
            res.cookie('userToken', token , {httpClient:true});
            res.redirect('/page');
        } else {
            res.status(403).send('Lỗi đăng nhập');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Không thể đăng nhập');
    }
};

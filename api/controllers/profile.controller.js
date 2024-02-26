const jwt = require('jsonwebtoken');
const User = require("../models/userdb");

// exports.getUser = async(req,res) => {
//     const listUser = await User.find()
//     res.status(200).jsson(listUser)
// }
function checkTokenBelongsToUser(req, res, next) {
    const token = req.cookies.userToken;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Missing token" });
    }
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const userIdFromToken = decoded.userId;

        if (userIdFromToken !== req.params.userId) {
            req.user = { id: userIdFromToken }; 
            next(); 
        } else {
            return res.status(401).json({ message: "Unauthorized - Token does not belong to this user" });
        }
    });
}

exports.getUser = async (req, res) => {
    checkTokenBelongsToUser(req, res, async () => {
        try {
            const userId = req.user.id;
            const user = await User.findOne({ _id: userId });
            res.status(200).json({ 
                id: user._id,
                username: user.username,
                email: user.email,
                numberphone: user.numberphone
            });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi server' });
        }
    });
};

exports.updateUserData = async(req,res) => {
    try {
        const userId = req.params.id
        const newDataUser = {
            username : req.body.username,
            email :req.body.email,
            numberphone:req.body.numberphone
        }
        const updateUser = await User.findByIdAndUpdate(userId , newDataUser)
        if(!updateUser){
            return res.status(200).json({message : " Không tìm thấy người dùng"})
        }
        res.status(200).json({newDataUser})
    }catch{
        return res.status(500).json({message : "Lỗi hiển thị"})
    }
}

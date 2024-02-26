const contentdb = require("../models/content.db")

exports.getPage = (async (req, res) => {
    const listContent = await contentdb.find()
    res.status(200).json(listContent)
})

exports.postPage = async (req, res) => {
    try {
      const token = req.cookies.userToken; 
  
      const dataContent = {
        content: req.body.content,
        Categories: req.body.Categories,
        token: token,
      };
      console.log(dataContent);
      const newContent = new contentdb(dataContent);
      const result = await newContent.save();
  
      res.status(200).send("Content Lưu thành công");
    } catch (error) {
      console.error('Lỗi không lưu được content', error);
      res.status(500).send("Content không thể lưu");
    }
  };

exports.contentUpdate = async (req, res) => {
    try {
        const contentId = req.params.id
        const newdataContent = {
            content: req.body.content,
            Categories: req.body.Categories,
        }
        const updateContent = await contentdb.findByIdAndUpdate(contentId, newdataContent)
        if (!updateContent) {
            return res.status(200).json({ message: "Không tìm thấy content" })
        }
        res.status(200).json({ message: "Cập nhật content thành công ", content: this.contentUpdate })
    } catch {

    }
}

exports.deleteContent = async (req, res) => {
    try {
        const contentId = req.params.id;
        const Idcontent = await contentdb.findById(contentId)
        if (!Idcontent) {
            return res.status(404).json({ message: "không tìm thấy người dùng" })
        }
        await Idcontent.deleteOne()
        return res.status(200).json({ message: 'Đã xoá thành công' });
    } catch (error) {
        return res.status(500)
    }
}

exports.searchByCategories = async (req, res) => {
    try {
        const searchCategories = req.params.id;
        const searchResults = await contentdb.findById(searchCategories);
        res.status(200).json(searchResults);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm theo Categories', error);
        res.status(500).send("Internal Server Error");
    }
}
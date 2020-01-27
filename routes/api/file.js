let router = require('express').Router()
let fs = require("fs");
let fileUtil = require('../../util/fileUtil')

router.post('/upload', (req, res)=>{
    let avatar = req.files.avatar
    console.log("upload file: ", avatar)
    let destPath = `${fileUtil.projectRootPath}/files/avatars/${avatar.md5}.${avatar.name.substring(avatar.name.lastIndexOf('.'), avatar.name.length)}`
    avatar.mv(destPath, error=>{
        if(error){
            console.log("error: ", error)
        }
        // 删除 temp 文件
        fs.unlink(avatar.tempFilePath, ()=>{
            console.log(`${avatar.tempFilePath} removed success.`)
        })

        res.redirect(`/web/home.html`)
    })
})

module.exports = router
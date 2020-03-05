/**
 * @description utils controller
 * @author qe
 */

const {ErrorModel, SuccessModel} = require('../models/ResponseModel')
const {UPLOAD_FILE_SIZE_FAIL} = require('../models/errors')
const fs = require('fs-extra')
const path = require('path')

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'upload')
// 文件最大上传大小
const MAX_SIZE = 1024 * 1024 * 1024

// 是否需要创建目录
!(async () => {
    const exist = await fs.pathExists(DIST_FOLDER_PATH)
    if (!exist) {
        await fs.ensureDir(DIST_FOLDER_PATH)
    }
})()

/**
 * 保存文件
 * @param name 文件名
 * @param type 文件类型
 * @param size 文件大小
 * @param filePath 文件路径
 * @returns {Promise<void>}
 */
async function saveFile({name, type, size, filePath}) {
    if (size > MAX_SIZE) {
        await fs.remove(filePath)
        return new ErrorModel(UPLOAD_FILE_SIZE_FAIL)
    }

    // 移动文件
    const filename = Date.now() + (Math.random() + '').slice(2) + '-' + name // 防止重名
    const distPath = path.join(DIST_FOLDER_PATH, filename)
    await fs.move(filePath, distPath)

    // 返回信息
    return new SuccessModel({
        url: '/' + filename
    })
}

module.exports = {
    saveFile
}

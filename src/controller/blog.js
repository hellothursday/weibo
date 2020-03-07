/**
 * @description blog controller
 * @author qe
 */

const {createBlog} = require('../services/blog')
const {SuccessModel, ErrorModel} = require('../models/ResponseModel')
const {CREATE_BLOG_FAIL} = require('../models/errors')

/**
 * 创建微博
 * @param userId 用户 ID
 * @param content 内容
 * @param image 图片
 * @returns {Promise<void>}
 */
async function create({userId, content, image}) {
    // service
    try {
        // 创建blog
        const blog = await createBlog({
            userId,
            content,
            image
        })
        return new SuccessModel(blog)
    } catch (e) {
        console.error(e.message, e.stack)
        return new ErrorModel(CREATE_BLOG_FAIL)
    }
}

module.exports = {
    create
}

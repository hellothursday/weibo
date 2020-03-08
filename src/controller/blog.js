/**
 * @description blog controller
 * @author qe
 */

const {createBlog, getBlogListByUser} = require('../services/blog')
const {SuccessModel, ErrorModel} = require('../models/ResponseModel')
const xss = require('xss')
const {CREATE_BLOG_FAIL} = require('../models/errors')
const {PAGE_SIZE} = require('../config/constant')

/**
 * 创建微博
 * @param userId 用户 ID
 * @param content 内容
 * @param image 图片
 * @returns {Promise<void>}
 */
async function create({userId, content, image}) {
    content = xss(content)
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

/**
 * 获取个人主页微博列表
 * @param username 用户名
 * @param page 当前页数
 * @returns {Promise<void>}
 */
async function getProfileBlogList(username, page = 0) {
    const result = await getBlogListByUser({
        username,
        page,
        size: PAGE_SIZE
    })
    const blogList = result.blogList
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        page,
        count: result.count
    })

}

module.exports = {
    create,
    getProfileBlogList
}

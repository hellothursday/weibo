/**
 * @description blog service
 * @author qe
 */

const {Blog, User} = require('../db/models')
const {formatUser} = require('./format')

async function createBlog({userId, content, image}) {
    const result = await Blog.create({
        userId, content, image
    })
    return result.dataValues
}

/**
 * 获取用户微博列表
 * @param username 用户名
 * @param page 当前页数
 * @param size 每页显示的条数
 * @returns {Promise<void>}
 */
async function getBlogListByUser({username, page = 0, size = 10}) {
    const where = {}
    if (username) {
        where.username = username
    }
    const result = await Blog.findAndCountAll({
        limit: size,
        offset: page * size,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'nickname', 'avatar'],
                where
            }
        ]
    })
    let blogList = result.rows.map(row => row.dataValues)
    blogList = blogList.map(item => {
        item.user = formatUser(item.user.dataValues)
        return item
    })
    const count = result.count
    return {
        count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser
}

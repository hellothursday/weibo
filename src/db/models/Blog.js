/**
 * @description 微博数据模型
 * @author qe
 */

const seq = require('../seq')
// eslint-disable-next-line
const {INTEGER, STRING, TEXT} = require('../types')

// blogs 表
const Blog = seq.define('blog', {
    // TODO Blog
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户 ID'
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: '微博内容'
    },
    image: {
        type: STRING,
        comment: '图片地址'
    }
})

module.exports = Blog

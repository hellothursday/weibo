/**
 * @description blog 数据相关的工具方法
 * @author qe
 */
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

const BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs'))
    .toString()

/**
 * 渲染微博列表
 * @param blogList 微博列表
 * @param canReply 是否可以回复
 * @returns {String}
 */
function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}



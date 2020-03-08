/**
 * @description profile api routers
 * @author qe
 */

const router = require('koa-router')()
const {loginGuard4Error} = require('../../middlewares/login-guards')
const {getProfileBlogList} = require('../../controller/blog')
const {getBlogListStr} = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多
router.get('/load-more/:username/:page', loginGuard4Error, async ctx => {
    let {username, page} = ctx.params
    page = parseInt(page)
    const result = await getProfileBlogList(username, page)

    // 渲染为 html 字符串
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router

/**
 * @description 广场页 api routes
 * @author qe
 */
const router = require('koa-router')()
const {loginGuard4Error} = require('../../middlewares/login-guards')
const {getSquareBlogList} = require('../../controller/blog')
const {getBlogListStr} = require('../../utils/blog')

router.prefix('/api/square')

router.get('/load-more/:page', loginGuard4Error, async ctx => {
    let {page} = ctx.params
    page = parseInt(page)
    const result = await getSquareBlogList(page)

    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router

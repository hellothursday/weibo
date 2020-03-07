/**
 * @description 微博 view 路由
 * @author qe
 */

const router = require('koa-router')()
const {loginGuard4Redirect} = require('../../middlewares/login-guards')

// 首页
router.get('/', loginGuard4Redirect, async ctx => {
    await ctx.render('index', {})
})

module.exports = router

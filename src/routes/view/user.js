/**
 * @description user view 路由
 * @author qe
 */

const router = require('koa-router')()
const {loginGuard4Redirect} = require('../../middlewares/login-guards')

function getLoginInfo(ctx) {
    const userInfo = ctx.session.userInfo

    let username = ''
    let logged = false
    if (userInfo) {
        logged = true
        username = userInfo.username
    }
    return {
        logged,
        username
    }
}

router.get('/login', async ctx => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async ctx => {
    await ctx.render('register', getLoginInfo(ctx))
})

router.get('/setting', loginGuard4Redirect, async ctx => {
    await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router

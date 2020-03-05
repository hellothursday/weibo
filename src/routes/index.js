const router = require('koa-router')()
const {loginGuard4Error, loginGuard4Redirect} = require('../middlewares/login-guards')

// eslint-disable-next-line no-unused-vars
router.get('/', loginGuard4Error, async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!',
        me: true,
        blogList: [
            {
                id: 1,
                title: 'aaa'
            },
            {
                id: 2,
                title: 'bbb'
            }
        ]
    })
})

// eslint-disable-next-line no-unused-vars
router.get('/json', loginGuard4Redirect, async (ctx, next) => {
    const session = ctx.session
    if (session.views == null) {
        session.views = 0
    }
    const views = ++session.views
    const title = 'koa2 json'
    ctx.body = {
        title,
        views
    }
})

// eslint-disable-next-line no-unused-vars
router.get('/profile/:username', async (ctx, next) => {
    const {username} = ctx.params
    ctx.body = {
        title: 'this is profile page',
        username
    }
})

// eslint-disable-next-line no-unused-vars
router.get('/load/:username/:page', async (ctx, next) => {
    const {username, page = 1} = ctx.params
    ctx.body = {
        title: 'this is load page',
        username,
        page
    }
})

module.exports = router

const router = require('koa-router')()

router.prefix('/users')

// eslint-disable-next-line no-unused-vars
router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

// eslint-disable-next-line no-unused-vars
router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

// eslint-disable-next-line no-unused-vars
router.post('/login', async (ctx, next) => {
    const {username, password} = ctx.request.body
    ctx.body = {
        tag: 100,
        username,
        password
    }
})

module.exports = router

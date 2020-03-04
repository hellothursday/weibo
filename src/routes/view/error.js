/**
 * @description error && 404
 * @author qe
 */

const router = require('koa-router')()

// eslint-disable-next-line no-unused-vars
router.get('/error', async (ctx, next) => {
    await ctx.render('error')
})

// eslint-disable-next-line no-unused-vars
router.get('*', async (ctx, next) => {
    await ctx.render('404')
})

module.exports = router

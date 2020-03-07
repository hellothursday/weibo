/**
 * @description 创建 blog api
 * @author qe
 */

const router = require('koa-router')()
const {loginGuard4Error} = require('../../middlewares/login-guards')
const {create} = require('../../controller/blog')

router.prefix('/api/blog')

router.post('/create', loginGuard4Error, async ctx => {
    const {content, image} = ctx.request.body
    const {id: userId} = ctx.session.userInfo
    ctx.body = await create({userId, content, image})
})

module.exports = router

/**
 * @description 创建 blog api
 * @author qe
 */

const router = require('koa-router')()
const {loginGuard4Error} = require('../../middlewares/login-guards')
const {create} = require('../../controller/blog')
const blogValidate = require('../../validator/blog')
const genValidator = require('../../middlewares/validator')

router.prefix('/api/blog')

router.post('/create', loginGuard4Error, genValidator(blogValidate), async ctx => {
    const {content, image} = ctx.request.body
    const {id: userId} = ctx.session.userInfo
    ctx.body = await create({userId, content, image})
})



module.exports = router

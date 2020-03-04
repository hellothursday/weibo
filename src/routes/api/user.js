/**
 * @description user API 路由
 * @author qe
 */
const {exist} = require('../../controller/user')
const router = require('koa-router')()

router.prefix('/api/user')

// 注册路由
router.post('/register', async ctx => {

})

// 用户名是否存在
router.post('/exist', async ctx => {
    const {username} = ctx.request.body
    ctx.body = await exist(username)
})

module.exports = router

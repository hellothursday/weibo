/**
 * @description user API 路由
 * @author qe
 */
const {exist, register, login, remove} = require('../../controller/user')
const router = require('koa-router')()
const userValidate = require('../../validator/user')
const genValidator = require('../../middlewares/validator')
const env = require('../../utils/env')
const {loginGuard4Error} = require('../../middlewares/login-guards')
const {ErrorModel} = require('../../models/ResponseModel')
const {NOT_TEST_ENV} = require('../../models/errors')

router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate), async ctx => {
    const {username, password, gender} = ctx.request.body
    ctx.body = await register({
        username,
        password,
        gender
    })
})

// 登录路由
router.post('/login', async ctx => {
    const {username, password} = ctx.request.body
    ctx.body = await login(ctx, username, password)
})

// 供测试接口
router.post('/delete-test', loginGuard4Error, async ctx => {
    // 测试环境下，测试用户登陆之后删除自己
    if (env.test) {
        const {username} = ctx.session.userInfo
        ctx.body = await remove(username)
        return
    }
    // 非测试环境下不可以删除
    ctx.body = new ErrorModel(NOT_TEST_ENV)
})

// 用户名是否存在
router.post('/exist', async ctx => {
    const {username} = ctx.request.body
    ctx.body = await exist(username)
})

module.exports = router

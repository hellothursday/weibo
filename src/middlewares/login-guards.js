/**
 * @description 检验是否登录的中间件
 * @author qe
 */

const {ErrorModel} = require('../models/ResponseModel')
const {LOGIN_CHECK_FAIL} = require('../models/errors')

/**
 * API 登录接口验证，失败则返回错误信息
 * @param ctx koa 上下文
 * @param next koa next
 * @returns {Promise<void>}
 */
async function loginGuard4Error(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    // 未登录
    ctx.body = new ErrorModel(LOGIN_CHECK_FAIL)
}

/**
 * 视图登录接口验证，失败则页面跳转
 * @param ctx koa 上下文
 * @param next koa next
 * @returns {Promise<void>}
 */
async function loginGuard4Redirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 已登录
        await next()
        return
    }
    ctx.redirect(`/login?url=${encodeURIComponent(ctx.url)}`)
}

module.exports = {
    loginGuard4Error,
    loginGuard4Redirect
}

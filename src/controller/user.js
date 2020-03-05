/**
 * @description user controller
 * @author qe
 */

const {getUserInfo, createUser, removeUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../models/ResponseModel')
const {USERNAME_NOT_EXIST, USERNAME_EXIST, REGISTER_FAIL, LOGIN_FAIL, DELETE_USER_FAIL} = require('../models/errors')
const encrypt = require('../utils/encrypt')

/**
 * 用户名是否存在
 * @param username 用户名
 * @returns {Promise<void>} 用户名是否已存在
 */
async function exist(username) {
    const userInfo = await getUserInfo(username)
    if (userInfo) {
        // 已存在
        return new SuccessModel(userInfo)
    } else {
        // 不存在
        return new ErrorModel(USERNAME_NOT_EXIST)
    }
}

/**
 * 注册
 * @param username 用户名
 * @param password 密码
 * @param gender 性别
 * @returns {Promise<void>}
 */
async function register({username, password, gender}) {
    const userInfo = await getUserInfo(username)
    if (userInfo) {
        // 用户名已存在
        return new ErrorModel(USERNAME_EXIST)
    }

    password = encrypt(password)
    try {
        await createUser({
            username,
            password,
            gender
        })
        // 注册成功
        return new SuccessModel()
    } catch (e) {
        // 注册失败
        console.error(e.message, e.stack)
        return new ErrorModel(REGISTER_FAIL)
    }
}

/**
 * 登录
 * @param ctx koa2 ctx
 * @param username 用户名
 * @param password 密码
 * @returns {Promise<void>}
 */
async function login(ctx, username, password) {
    password = encrypt(password)
    // 获取用户信息
    const userInfo = await getUserInfo(username, password)
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(LOGIN_FAIL)
    }
    // 登陆成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessModel()
}

/**
 * 删除用户
 * @param username 用户名
 * @returns {Promise<void>}
 */
async function remove(username) {
    const result = await removeUser(username)
    if (result) {
        // 删除成功
        return new SuccessModel()
    }
    // 删除失败
    return new ErrorModel(DELETE_USER_FAIL)
}

module.exports = {
    exist,
    register,
    login,
    remove
}

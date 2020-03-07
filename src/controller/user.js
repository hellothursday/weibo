/**
 * @description user controller
 * @author qe
 */

const {getUserInfo, createUser, removeUser, updateUser} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../models/ResponseModel')
const {USERNAME_NOT_EXIST, USERNAME_EXIST, REGISTER_FAIL, LOGIN_FAIL, DELETE_USER_FAIL, CHANGE_INFO_FAIL, CHANGE_PASSWORD_FAIL} = require('../models/errors')
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

/**
 * 修改用户信息
 * @param ctx koa 上下文
 * @param nickname 昵称
 * @param city 城市
 * @param avatar 头像
 * @returns {Promise<void>}
 */
async function changeInfo(ctx, {nickname, city, avatar}) {
    const {username} = ctx.session.userInfo
    if (!nickname) {
        nickname = username
    }
    const result = await updateUser({newNickname: nickname, newCity: city, newAvatar: avatar}, {username})
    if (result) {
        // 成功
        Object.assign(ctx.session.userInfo, {nickname, city, avatar})
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(CHANGE_INFO_FAIL)
}

/**
 * 修改密码
 * @param username 用户名
 * @param password 旧密码
 * @param newPassword 新密码
 * @returns {Promise<void>}
 */
async function changePassword(username, password, newPassword) {
    password = encrypt(password)
    newPassword = encrypt(newPassword)
    const result = await updateUser({newPassword}, {username, password})
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(CHANGE_PASSWORD_FAIL)
}

/**
 * 退出登录
 * @param ctx koa 上下文
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    exist,
    register,
    login,
    remove,
    changeInfo,
    changePassword,
    logout
}

/**
 * @description user controller
 * @author qe
 */

const {getUserInfo} = require('../services/user')
const {SuccessModel, ErrorModel} = require('../models/ResponseModel')
const {USERNAME_NOT_EXIST} = require('../models/errors')

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

module.exports = {
    exist
}

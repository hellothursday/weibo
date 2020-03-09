/**
 * @description 用户关系 controller
 * @author qe
 */

const {getFollowersByIdol, addFollow, removeFollow} = require('../services/userrelation')
const {SuccessModel, ErrorModel} = require('../models/ResponseModel')
const {ADD_FOLLOWER_FAIL, DELETE_FOLLOWER_FAIL} = require('../models/errors')

/**
 * 根据 userId 获取粉丝
 * @param userId 用户 ID
 * @returns {Promise<void>}
 */
async function getFollowers(userId) {
    const {count, followerList} = await getFollowersByIdol(userId)
    return new SuccessModel({
        count,
        followerList
    })
}


/**
 * 关注
 * @param userId 当前用户 ID
 * @param idolId 被关注者的 ID
 * @returns {Promise<void>}
 */
async function follow(userId, idolId) {
    try {
        await addFollow(userId, idolId)
        return new SuccessModel()
    } catch (e) {
        console.error(e.message, e.stack)
        return new ErrorModel(ADD_FOLLOWER_FAIL)
    }
}

/**
 * 取消关注
 * @param userId 当前用户 ID
 * @param idolId 被关注者的 ID
 * @returns {Promise<void>}
 */
async function unfollow(userId, idolId) {
    const result = await removeFollow(userId, idolId)
    if (result) {
        // 删除成功
        return new SuccessModel()
    }
    // 删除失败
    return new ErrorModel(DELETE_FOLLOWER_FAIL)
}


module.exports = {
    getFollowers,
    follow,
    unfollow
}

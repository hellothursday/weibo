/**
 * @description 用户关系 controller
 * @author qe
 */

const {getFollowersByIdol} = require('../services/userrelation')
const {SuccessModel} = require('../models/ResponseModel')

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

module.exports = {
    getFollowers
}

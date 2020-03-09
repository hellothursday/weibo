/**
 * @description 微博缓存
 * @author qe
 */

const {get, set} = require('./redis')
const {getBlogListByUser} = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取微博广场缓存
 * @param page 当前页数
 * @param pageSize 每页条数
 * @returns {Promise<void>}
 */
async function getSquareCacheList(page, pageSize) {
    const key = `${KEY_PREFIX}${page}_${pageSize}`
    // 尝试获取缓存
    const cacheResult = await get(key)
    if (cacheResult != null) {
        // 获取缓存成功
        return cacheResult
    }
    // 没有缓存，则访问数据库
    const result = await getBlogListByUser({
        page, pageSize
    })
    // 设置缓存
    set(key, result, 60)
    return result
}

module.exports = {
    getSquareCacheList
}

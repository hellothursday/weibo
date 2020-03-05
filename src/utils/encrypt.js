/**
 * @description 加密方法
 * @author qe
 */

const crypto = require('crypto')
const {CRYPTO_KEY} = require('../config/keys')


/**
 * md5 加密
 * @param content 明文
 */
function md5(content) {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * 加密
 * @param content 明文
 * @returns {*}
 */
function encrypt(content) {
    const str = `content=${content}&key=${CRYPTO_KEY}`
    return md5(`md5=${md5(str)}&key=${CRYPTO_KEY}`)
}

module.exports = encrypt

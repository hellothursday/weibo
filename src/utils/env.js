/**
 * @description 环境变量
 * @author qe
 */

const ENV = process.env.NODE_ENV

module.exports = {
    development: ENV === 'development',
    production: ENV === 'production',
    test: ENV === 'test'
}

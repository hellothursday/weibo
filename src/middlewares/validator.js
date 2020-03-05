/**
 * @description json schema 验证中间件
 * @author qe
 */

const {ErrorModel} = require('../models/ResponseModel')
const {JSON_SCHEMA_FAIL} = require('../models/errors')

/**
 * 生成中间件
 * @param validateFn 验证函数
 * @returns {Function}
 */
function genValidator(validateFn) {
    // 返回中间件函数
    return async (ctx, next) => {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            // 验证失败
            ctx.body = new ErrorModel(JSON_SCHEMA_FAIL)
            return
        }
        // 验证成功，继续
        await next()
    }
}

module.exports = genValidator

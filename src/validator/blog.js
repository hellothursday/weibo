/**
 * @description blog 数据格式校验
 * @author qe
 */

const validate = require('./validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
}

// 执行校验
function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = blogValidate


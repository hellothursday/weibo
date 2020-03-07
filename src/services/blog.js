/**
 * @description blog service
 * @author qe
 */

const {Blog} = require('../db/models')

async function createBlog({userId, content, image}) {
    const result = await Blog.create({
        userId, content, image
    })
    return result.dataValues
}

module.exports = {
    createBlog
}

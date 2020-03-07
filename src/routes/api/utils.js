/**
 * @description utils api 路由
 * @author qe
 */

const router = require('koa-router')()
const {loginGuard4Error} = require('../../middlewares/login-guards')
const koaForm = require('formidable-upload-koa')
const {saveFile} = require('../../controller/utils')

router.prefix('/api/utils')

router.post('/upload', loginGuard4Error, koaForm(), async ctx => {
    const file = ctx.req.files['file']
    if (!file)
        return
    const {size, path: filePath, name, type} = file
    ctx.body = await saveFile({
        name,
        size,
        filePath,
        type
    })
})

module.exports = router

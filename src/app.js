const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {host, port} = require('./config/db').REDIS_CONFIG
const env = require('./utils/env')

const index = require('./routes')
const userView = require('./routes/view/user')
const userApi = require('./routes/api/user')
const error404 = require('./routes/view/error')

// error handler
onerror(app, {
    redirect: env.production ? '/error' : null
})

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// session 配置
app.keys = ['ADSdhkjhfka89574$#$523_FASahasdHDsklfHFSD^9857Fareq']
app.use(session({
    key: 'weibo.sid',
    prefix: 'weibo:sess:',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 * 3 // one day in ms
    },
    // ttl: 24 * 60 * 60 * 1000 * 3, // one day in ms
    store: redisStore({
        all: `${host}:${port}`
    })
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userView.routes(), userView.allowedMethods())
app.use(userApi.routes(), userApi.allowedMethods())
/* error && 404 */
app.use(error404.routes(), error404.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app

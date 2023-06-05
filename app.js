const Koa = require('koa')

const bodyParser = require('koa-bodyparser')

const controller = require('./controller')

const templating = require('./templating')

const cors = require('@koa/cors')

const isProduction = process.env.NODE_ENV === 'production'

const app = new Koa()

const { parseUser, createWebSocketServer, onConnect, onMessage, onClose } = require('./util')

app.use(cors())

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`)
    await next()
})

// app.use(async (ctx, next) => {
//     const start = new Date().getTime(); // 当前时间
//     await next(); // 调用下一个middleware
//     const ms = new Date().getTime() - start; // 耗费时间
//     console.log(`Time: ${ms}ms\n`); // 打印耗费时间
// });

// parse user from cookie:
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});

if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}))

app.use(bodyParser())

app.use(controller())

const port = 3000
const server = app.listen(port)


app.wss = createWebSocketServer(server, onConnect, onMessage, onClose)
console.log(`app started at port ${port}\n`)

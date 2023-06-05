const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const cors = require('@koa/cors')

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

const corsConfig = {
    origin: 'http://localhost:3002'
}



router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/api/pdf', async (ctx, next) => {
    ctx.response.body = '上传成功...'
});

app.use(bodyParser());
// add router middleware:
app.use(router.routes());

app.listen(3002);
console.log('app started at port 3002...');
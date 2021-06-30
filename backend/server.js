const Koa = require('koa');
const cors = require('@koa/cors')

const data = require('./data')

const app = new Koa();

app.use(cors())
app.use(ctx => {
  ctx.body = data;
});

app.listen(3030);
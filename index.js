const koa = require('koa')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
var router = require('./routes.js')
const render = require('koa-ejs')
const path = require('path')

const app = new koa()

app.use(json())
app.use(bodyParser())

//setting middleware

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(5000, ()=>{
    console.log("App is running on port 5000")
})

const koa = require('koa')
const json = require('koa-json')
const koaRouter = require('koa-router')
const bodyPaser = require('koa-bodyparser')
const render = require('koa-ejs')
const path = require('path')
const { request } = require('http')
const app = new koa()

app.use(json())
app.use(bodyPaser())

const router = new koaRouter()

const countries = [{id:0, name:'India'}, {id:1, name:'Marrocos'} , {id:2, name:'Paquistão'} ]

//setting middleware

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

app.use(router.routes()).use(router.allowedMethods())


//routes
router.get('/', async ctx => {
    await ctx.render('index',{
        title: 'Countries Added',
        countries: countries
    })
})
router.get('/addcountry', async ctx => {
    await ctx.render('add',{
        title: 'Add Country'
    })
})

router.get('/editcountry/:id', async ctx => {
    await ctx.render('edit',{
        title: 'Edit Country',
        id: ctx.params.id       
    })
})

router.get('/deletecountry/:id', async ctx => {
    await ctx.render('delete',{
        title: 'Delete Country',
        id: ctx.params.id 
    })
})

router.post('/addcountry', add)
router.post('/deletecountry', del)
router.post('/editcountry', edit)

async function add(ctx){
    const body = ctx.request.body
    const country = {
        id: countries.length+1,
        name: body.name
    }
    countries.push(country)
    ctx.redirect('/')
}

async function edit(ctx){
    const body = ctx.request.body
    const countryNew = {
        id: body.id,
        name: body.name
    }

    countries.forEach(country => {
        if(country.id == countryNew.id) {
            country.name = countryNew.name
        }
    })
    ctx.redirect('/')
}

async function del(ctx){
    const body = ctx.request.body
    const id = body.id

    countries.forEach(country => {
        if(country.id == id) {
            countries.splice(countries.indexOf(country), 1)
        }
    })
    ctx.redirect('/')
}

app.listen(5000, ()=>{
    console.log("App is running on port 5000")
})
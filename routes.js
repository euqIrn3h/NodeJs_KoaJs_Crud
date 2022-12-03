const Router = require('koa-router')
var router = new Router()


var controller = require('./controllers/countryController.js')


router.get('/', async ctx => {
    var countries = await controller.read()
    .then(
        ctx.status = 200
    ).catch(err => { 
        ctx.status = 404,
        console.error(err)
    })

    await ctx.render('index',{
        title: 'Countries Added',       
        countries:  countries || []

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

router.post('/addcountry', controller.create)
router.post('/deletecountry', controller.del)
router.post('/editcountry', controller.edit)

module.exports = router
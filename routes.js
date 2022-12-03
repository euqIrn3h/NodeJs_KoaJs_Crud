const Router = require('koa-router')
var router = new Router()


var controller = require('./controllers/countryController.js')


router.get('/', async ctx => {
    await ctx.render('index',{
        title: 'Countries Added',
        countries: controller.countries
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

router.post('/addcountry', async ctx => {
    controller.create()
        .then(
            ctx.status = 200,
            ctx.redirect('/')
        )
        .catch(err =>{
            console.log(err)
            ctx.status = 500
            ctx.redirect('/')
        })
})
router.post('/deletecountry', controller.del)
router.post('/editcountry', controller.edit)

module.exports = router
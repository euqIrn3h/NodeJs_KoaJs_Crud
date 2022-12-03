const database = require('./../db.js');
const Country = require('./../models/country.js');

const countries = [{id:0, name:'India'}, {id:1, name:'Marrocos'} , {id:2, name:'Paquistão'} ]

async function create(ctx){
    const body = ctx.request.body
    try {
        await database.sync();      
        await Country.create({
            Name: body.name
        })
        ctx.redirect('/')
    } catch (error) {
        console.log(error);
    }
};

async function read(){
    try {
        await database.sync();  
        const countries = await Country.findAll();
        return countries
    } catch (error) {
        console.log(error);
    }
}

async function update(ctx){
    const body = ctx.request.body
    try {
        await database.sync();  
        const country = await Country.findByPk(body.id);
        country.Name = body.name;
        await country.save();
        ctx.redirect('/')   
    } catch (error) {
        console.log(error);
    }
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

module.exports = {
    create: create,
    read: read,
    update: update,
    edit: edit,
    del: del,
    countries: countries
}
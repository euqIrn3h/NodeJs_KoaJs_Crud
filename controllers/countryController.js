const database = require('./../db.js');
const Country = require('./../models/country.js');

const countries = [{id:0, name:'India'}, {id:1, name:'Marrocos'} , {id:2, name:'Paquistão'} ]

async function create(ctx){
    const body = ctx.request.body
    try {
        const result = await database.sync();
        console.log(result);
        
        const Create = await Country.create({
            Name: body.name
        })
        console.log(Create);
    } catch (error) {
        console.log(error);
    }
};

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

module.exports = {
    create: create,
    add : add,
    edit: edit,
    del: del,
    countries: countries
}
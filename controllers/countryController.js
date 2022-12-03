const database = require('./../db.js');
const Country = require('./../models/country.js');

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

async function del(ctx){
    const body = ctx.request.body
    try {
        await database.sync();  
        Country.destroy({ where: {Id: body.id}})
        ctx.redirect('/')   
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    create: create,
    read: read,
    update: update,
    del: del
}
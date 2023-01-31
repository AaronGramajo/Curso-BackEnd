const Todos = require('./todos.js')
const Api = require('../data_Persistence/Daos/products/productsDaoMongoDb.js')
const assert = require('assert').strict
const axios = require('axios')
const {existsSync, readFileSync, unlinkSync} = require('fs')
const { response } = require('express')


describe('test de funcionalidad del Api', async function() {

    it('Deberia traer todos los productos', async function() {
        const api = new Api()
        await api.getAll()
        // console.log( await api.getAll())
    })

    it('Deberia traer el producto por id', async function() {
        const api = new Api()
        await api.getById('6375c380c835b9359618c967')
        assert.strictEqual(await api.getById('6375c380c835b9359618c967'), [
            {
                _id: new ObjectId("6375c380c835b9359618c967"),
                title: 'Meta Quest 2',
                price: 200000,
                thumbnail: 'https://gmedia.playstation.com/is/image/SIEPDC/playstation-5-with-dualsense-front-product-shot-01-ps5-en-30jul20',
                __v: 0
            }
        ])
        // console.log( await api.getById('6375c380c835b9359618c967'))
    })
})

describe('comprobar error en la Api', function() {
    it('deberia dar error cuando no encuentra producto', function() {
        const api = new Api()
        const errorEsperado = new Error(`product not found, CastError: Cast to ObjectId failed for value "23" (type string) at path "_id" for model "Products"`)
        assert.throws(() => {
            api.getById('23')
        }, errorEsperado)
    })
})

describe('test de axios', function() {

    it('Deberia traer los productos usando fetch', async function() {
        const response = await axios.get('http://localhost:8080/api/products')
        console.log(response.data)
    })
})
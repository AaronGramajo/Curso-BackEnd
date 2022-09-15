// const fs = require ('fs')

// const computadora = {
//     color:'blanca',
//     dd:'160gb',
//     marca:'HP',
//     encender:function() {

//     },
//     apagar:()=>{

//     }
// }

// const info = {
//     contenidoSTR:'',
//     contenidoObj:{},
//     size:0
// }

// fs.readFile('../package.json','utf-8',(error,contenido)=>{
//     if(error) {
//         return error
//     }else {
//         info.contenidoSTR=contenido;
//         info.contenidoObj=JSON.parse(contenido)
//         info.size=contenido.length
//         console.log(info)
//     }
// })

// console.log(JSON.stringify(computadora))

// console.log(__filename)
// console.log(__dirname)

// let nombres = ['pablo', 'mica', 'abraham', 'nahuel', 'jocy'];

// const mostrarNombres=()=>{
//     return Math.floor(Math.random()*nombres.length)
// }

// console.log(nombres[mostrarNombres()])

// for (let i = 0; i < nombres.length; i++) {
//     console.log(nombres[mostrarNombres()])
// }

// let numeros = {}

// const numerosRandom=()=>{
//     return Math.floor(Math.random()*20)+1
// }

// for (let i = 0; i < 10000; i++) {
//     let numero = numerosRandom()
//     if (!numeros[numero]) numeros[numero]=0
//     numeros[numero]++
// }

// const productos = [
//     { id:1, nombre:'Escuadra', precio:323.45 },
//     { id:2, nombre:'Calculadora', precio:234.56 },
//     { id:3, nombre:'Globo Terráqueo', precio:45.67 },
//     { id:4, nombre:'Paleta Pintura', precio:456.78 },
//     { id:5, nombre:'Reloj', precio:67.89 },
//     { id:6, nombre:'Agenda', precio:78.90 }
// ]

// const getNames=()=>{
//     return productos.map(el=>el.nombre).join(', ')
// }

// const getTotalPrice=()=>{
//     let total=0
//     productos.forEach(price=>total+=price.precio)
//     return total
// }

// const precioPromedio=()=>{
//     return getTotalPrice() / productos.length
// }

// const getproduPrecioMenor=()=>{
//     let min = productos[0].precio
//     let prod = productos[0].nombre
//     for (const prods of productos) {
//         if(prods.precio < min) {
//             min = prods.precio
//             prod = prods.nombre
//         }
//     }
//     // return {prods:prod,precio:min}
//     return prod
// }

// const getproduPrecioMayor=()=>{
//     let min = productos[0].precio
//     let prod = productos[0].nombre
//     for (const prods of productos) {
//         if(prods.precio > min) {
//             min = prods.precio
//             prod = prods.nombre
//         }
//     }
//     // return {prods:prod,precio:min}
//     return prod
// }

// function to2decimales(valor){
//     return Number(valor.toFixed(2))
// }

// let info = {
//     nombres:getNames(),
//     total:to2decimales(getTotalPrice()),
//     promedio:to2decimales(precioPromedio()),
//     minimo:getproduPrecioMenor(),
//     maximo:getproduPrecioMayor()
// }

// console.log(info)

// const moment = require('moment')
// const time = moment().format("MMM Do YY")
// const myDate = moment().format("March 8th ")
// console.log(`hoy es ${time}`)
// console.log(`yo naci en ${myDate} `)
// console.log()
// console.log()
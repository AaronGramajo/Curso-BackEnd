const Todos = require('./todos.js')

const todos = new Todos()
console.log(todos.list())

todos.add('run code')
console.log(todos.list())

todos.add('another todo')
console.log(todos.list())

todos.complete('run code')
console.log(todos.list())
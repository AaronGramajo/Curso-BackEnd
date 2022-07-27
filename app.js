class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(pet) {
        this.mascotas.push(pet)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook(libro,autor) {
        this.libros.push({nombre : libro , Autor : autor})
    }

    getBookNames() {
        return this.libros.map((el) => el.nombre)
    }
}

const user1 = new Usuario ('Aaron', 'Gramajo', [{nombre :'Señor de los Anillos', Autor : 'J.R.R'}], ['Gato'])

console.log(user1)
console.log(user1.getFullName())
console.log(user1.addMascota('Perro'))
console.log(user1.mascotas)
console.log(user1.countMascotas())
console.log(user1.addBook('El gato en el sombrero', 'Dr. Seuss'))
console.log(user1.libros)
console.log(user1.getBookNames())
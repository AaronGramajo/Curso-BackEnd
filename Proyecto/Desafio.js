const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require('crypto')

///////// Schemes

const schema = buildSchema(`
    input RecordatorioInput {
        title: String,
        description: String,
    }
    type Recordatorio {
        id: ID!,
        title: String,
        description: String,
        timeStamp: String
    }
    type Query {
        getRecordatorio(id:ID!): Recordatorio,
        getRecordatorios(field: String, value: String): [Recordatorio],
    }
    type Mutation {
        createRecordatorio(data: RecordatorioInput): Recordatorio
        updateRecordatorio(id:ID!, data: RecordatorioInput): Recordatorio,
        deleteRecordatorio(id:ID!): Recordatorio,
    }
`)

///////////////////// Class

class Recordatorio {
    constructor(id, timeStamp, {title, description}){
        this.id = id
        this.title = title
        this.description = description
        this.timeStamp = timeStamp
    }
}

/////////////////// DTO

const RecordatorioMap = {}

function getRecordatorios({field, value}) {
    const Recordatorios = Object.values(RecordatorioMap)
    if (field && value) {
        return Recordatorios.filter(p => p[ field ] == value)
    } else {
        return Recordatorios
    }

    // field && value ? personas.filter(p => p[ field ] == value) : personas
}

function getRecordatorio({ id }) {
    if (!RecordatorioMap[ id ]) {
        throw new Error('Recordatorio not found.')
    }
    return RecordatorioMap[ id ]
}

function createRecordatorio({ data }) {
    const id = crypto.randomBytes(10).toString('hex')
    const timeStamp = new Date().toLocaleDateString()
    const nuevoRecordatorio = new Recordatorio(id, timeStamp,  data)
    RecordatorioMap[ id ] = nuevoRecordatorio
    return nuevoRecordatorio
}

function updateRecordatorio({ id, data }) {
    if (!RecordatorioMap[ id ]) {
        throw new Error('Recordatorio not found.')
    }
    const updatedRecordatorio = new Recordatorio(id, timeStamp,  data )
    RecordatorioMap[ id ] = updatedRecordatorio
    return updatedRecordatorio
}

function deleteRecordatorio({ id }) {
    if(!RecordatorioMap[ id ]) {
        throw new Error('Recordatorio not found.')
    }
    const deletedRecordatorio = RecordatorioMap[ id ]
    delete RecordatorioMap[ id ]
    return deletedRecordatorio
}

//// Server

const app = express()

const configGraphql = {
    schema: schema,
    rootValue: {
        getRecordatorio,
        getRecordatorios,
        createRecordatorio,
        updateRecordatorio,
        deleteRecordatorio
    },
    graphiql: true
}

app.use(express.static('public'))
app.use('/graphql', graphqlHTTP(
    configGraphql
))


const PORT = 8080

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

/// esto seria si modulariazmos
// class GraphQlController {
//     constructor() {
//         this.api = new UsuariosApi()
//         this.config = { 
//             schema: personaSchema ,
//             rootValue: {
//                 getPersona: this.api.getPersona
//             }
//         }
//         return graphqlHTTP(this.config)
//     }
// }

// Daos
//seria la clase de persona

//usuario Api 
//seria las funciones con getPersona, ect. llamando al Daos con la clase persona para instanciar

//schema
//seria la schema de graphql

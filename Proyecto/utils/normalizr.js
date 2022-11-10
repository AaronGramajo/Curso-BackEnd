const normalizr = require('normalizr');
const { schema, normalize, denormalize } = normalizr;

const authorSchema = new schema.Entity('authors', {}, {idAttribute: 'id'})

const messageSchema = new schema.Entity('messages', {author: authorSchema}, {idAttribute: '_id'})

const postSchema = new schema.Entity('posts', {messages: [messageSchema]}, {idAttribute: 'id'})

const normalizedMessages = (data) => {
    const normalizePosts = normalize(data, postSchema)
    return normalizePosts
}

const denormalizeMessages = (data) => {
    const denormalizedMessages = denormalize(data.result, postSchema ,data.entities)
    return denormalizedMessages
}

module.exports = { normalizedMessages, denormalizeMessages }
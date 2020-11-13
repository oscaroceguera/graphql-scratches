import mongoose, { mongo } from 'mongoose'

const DB_URI = 'mongodb://localhost:27017/graphql-app'

mongoose.connect(DB_URI, { useNewUrlParser: true })

mongoose.connection.once('open', () => console.log('Connected to a MongoDB instance'))

mongoose.connection.on('error', error => console.error(error))

export default mongoose
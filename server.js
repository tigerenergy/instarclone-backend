require('dotenv').config()
import express from 'express'
import logger from 'morgan'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'
import { getUser } from './users/users.utils'
import pubsub from './pubsub'

const PORT = process.env.PORT
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    }
  },
})

const app = express()
app.use(logger('tiny'))
apollo.applyMiddleware({ app })
app.use('/static', express.static('uploads'))
app.listen({ port: PORT }, () => {
  console.log(`🐯🐯🐯🐯🐯 💖 http://localhost:${PORT}/graphql 💖 🐷🐷🐷🐷🐷`)
})

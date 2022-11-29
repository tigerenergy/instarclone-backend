require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import { getUser } from './users/users.utils';

const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

server
  .listen(PORT)
  .then(() =>
    console.log(`🐯 절대 포기하지 말자 🐯 [http://localhost:${PORT}/]`)
  );

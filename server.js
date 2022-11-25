require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';
const server = new ApolloServer({
  schema,
  context: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5Mzc5NTE5fQ.1T2B43hMUiUPH2RosVvSVil2h-4wwOUwsiYxNBkg8zI',
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`🐯 포기하지 말자 🐯 [http://localhost:${PORT}/]`));

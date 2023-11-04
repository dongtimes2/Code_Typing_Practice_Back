import app from './app.js';
import loaders from './loaders/index.js';

const startServer = async () => {
  await loaders();
  app.listen(app.get('port'), () => {
    console.log('express server is started');
    console.log(`port number is ${app.get('port')}`);
    console.log(`environment is ${process.env.NODE_ENV}`);
  });
};

startServer();

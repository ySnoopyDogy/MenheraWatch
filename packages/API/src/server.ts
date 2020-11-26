import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Http from 'http';
import routes from './routes';

// ROUTES
// import deployRoutes from "./routes/deploy"
// import QUATROCENTOSEQUATRO from "./routes/404"
// import menheraMessages from "./routes/clientMessages"
// import menheraLogs from "./routes/logsManager"
// import menheraStats from "./routes/statsManager"

// MIDDLEWARES
import NotFound from './middlewares/NotFound';
import ErrorHandler from './middlewares/ErrorHandler';

const app = express();
const server = Http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(superSecretRoute, deployRoutes)

// app.use('/api/stats', menheraStats)
app.use(routes);
// app.use('/api/logs', menheraLogs)
// app.use('/api/comunicate', menheraMessages)
// app.use('/*', QUATROCENTOSEQUATRO)

app.use(NotFound);
app.use(ErrorHandler);

server.listen(process.env.PORT, () => {
  console.log(`[API] Server started on port ${process.env.PORT}`);
});

import express from 'express';
//import {all_routes} from './all_routes/index'
//import {all_utilities} from './all_utilities/'
import Router from './api/index';
import middelwares from './all_utilities/middelwares';
const app = express();
const port = 3009;

app.use('/api',middelwares, Router);
app.use(express.static('/images'));

app.listen(port, () =>
  console.log(`The Server is Working Successfully on Port ${port}`)
);

export default app;

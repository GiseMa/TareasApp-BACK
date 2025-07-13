import express from 'express';
import 'dotenv/config';
import dbConnection from "./database/config.js";
import cors from 'cors';
import router from './routes/router.js';

const app = express();

dbConnection();
 
app.use(cors())

app.use(express.json());

app.use('/api', router)

app.listen(process.env.PORT, () => {
    console.log(`Server Ok en puerto ${process.env.PORT}!`)
})
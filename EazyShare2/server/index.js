import express from "express";
import router from "./routes/routes.js";
import cors from 'cors';
import dotenv from "dotenv";
import DBConnection from "./database/db.js";

// dotenv.config({path: './.env'});
dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/files', express.static('public/uploads'));


app.use('/', router);
const PORT = process.env.PORT || 8090;

DBConnection();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

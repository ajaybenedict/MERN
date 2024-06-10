const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const taskRoutes = require('./routes/taskRoute');
const cors = require('cors');

// app.get('/', (req, res) => {
//     res.send('Hello world');
// });

app.use((req, res, next) => {
    console.log('path', process.env.PATH);
    console.log('mothod', process.env.METHOD);
    next();
});

app.use(express.json());
app.use(cors());

//Middleware
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('DB connected - listening to ' + process.env.PORT);
        })

    }).catch(e => {
        console.log('error', e);
    });

    app.use('/api/tasks', taskRoutes);




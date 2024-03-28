const express = require('express');
require('dotenv').config();
const sequelize = require('./db')
const models = require('./models/models.js');
const fileupload = require('express-fileupload');
const cors = require('cors');
const router = require('./routes/index.js');
const errorHandler = require('./middlewears/ErorHandling.js');
const PORT = process.env.PORT || 5000
const path = require('path');
const app = express();


app.use(cors());
app.use(express.json());
app.use(fileupload({}));
app.use('/api', router);
app.use(express.static(path.resolve(__dirname, "public")))

//должен быть последним
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server started on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

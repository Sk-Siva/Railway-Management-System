const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const adminRoute = require('./routes/admin')
const trainRoutes = require('./routes/train');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', trainRoutes);
app.use('/api', adminRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
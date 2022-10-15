const express = require('express');
const apiRoutes = require('./routes/dataRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));
app.use('/api', dataRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
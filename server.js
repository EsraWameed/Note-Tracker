//adding requirements/dependencies
const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
//creating app
const app = express();
//listening to port or port 3001
const PORT = process.env.PORT || 3001;
//middleware parsing incoming requests
app.use(express.urlencoded({ extended: true }));
//middleware function, parses json requests and puts parsed data in req.body
app.use(express.json());
//enables use of the public directory files via http
app.use(express.static('public'));
app.use('/api', dataRoutes);
app.use('/', htmlRoutes);

//listening for active app portall
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
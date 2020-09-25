const express = require('express');
const app = express();


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('Hello Worlds!');
});



const pricingRouter = require('./server/routes/pricing-router');
app.use('/api', pricingRouter);



// // Serve static files from the React app
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'client/build')));

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });



module.exports = app;
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Route files
const hospitals = require ('./routes/hospitals');
const auth = require ('./routes/auth');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Mount routers
app.use('/api/v1/hospitals', hospitals);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5003;
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
});





// Origital status from example slides for test each status code.
//app.get('/', (req, res) => {
//    res.send('<h1>Hello from express</h1>');
//    res.send({name: 'Brad'});
//    res.json({name: 'Brad'});
//    res.sendStatus(400);
//    res.sendStatus(400).json({success:true, data:{id:1}});
//    res.status(200).json({success:true, data:{id:1}});
//});





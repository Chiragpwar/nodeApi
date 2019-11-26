const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
const http = require("http");
app.use(session({secret: 'ssshhhhh'}));
const DbAuth = require('./public/config/Configuration');
const register = require('./public/controller/RegisterController/registercontroller');
const mail = require('./public/controller/mail/mailController');
const Roomcontroller = require('./public/controller/Roomcontroller/Roomcontroller');
const userprofile = require('./public/controller/userprofile/userprofile');
const billing = require('./public/controller/Billing/Billing');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const server = http.createServer(app);

require('./public/socket/socketserver')(server);

const port = process.env.PORT || 3000;

server.listen(port, () => DbAuth.DbConnect());

app.post('/UserRegistration', register.Registeruser);

app.post('/Loginuser', register.login);

app.post('/GoogleSignin', register.Signinlogin);

app.post('/Contsctusmail', mail.contactUsmail);

app.get('/verification/:code', register.Verification);

app.post('/RoomAdd', Roomcontroller.Room);

app.get('/getRoom/:Owner', Roomcontroller.getRoom);

app.get('/getRooms/:room', Roomcontroller.getRooms);

app.post('/Deleteownerroom/:room', Roomcontroller.deleteRooms);

app.post('/manageuserprofile/', userprofile.Updateprofile);

app.post('/Customerbilling', billing.CustomerBilling);

app.post('/stripePayment', billing.paymentStripe);
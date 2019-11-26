const mongoose = require('mongoose');


const RegistrationSchema = mongoose.Schema({  
    email: String,
    firstName: String,
    id: String,
    lastName: String,
    name: String,
    photoUrl: { type: String, default:"https://www.kkmm.gov.my/images/sub_bahagian/icon.png"},
    provider: { type: String, default:""}
})

const Contactus  = mongoose.Schema({
    WorkEmail: String,
    CompanyName: String,
    FirstName: String,
    LastName: String,
    Communication: String,
    Country: String,
    NumberofEmployee: String
})

const room  = mongoose.Schema({
    Roomname: String,
    Email : String,
    name: String,
    photoUrl: String
})

const Billing = mongoose.Schema({
    billingEmail: String,
    vatIdentifier: String,
    billingName: String,
    billingAddress: String,
    billingPostcode: String,
    billingCity: String,
    Country: String,
    AuthEmail: String
})

exports.ContactusModal =  mongoose.model('Contactus', Contactus,'Contactus');

exports.RoomModal =  mongoose.model('room', room,'room');

exports.RegisterModal =  mongoose.model('Registration',RegistrationSchema,'register');

exports.BillingModal =  mongoose.model('Billing', Billing, 'Billing');
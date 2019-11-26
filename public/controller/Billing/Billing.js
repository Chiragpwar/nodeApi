const mongoose = require("mongoose");
const CommenModal = require("../../modal/customModal");
const stripe_payment = require('stripe')('sk_test_9x4rYVKwymxdZ3kHHeC2wLr700dbxtJtKa');

exports.CustomerBilling = (req, res) => {

    const CustomerBilling = new CommenModal.BillingModal({
        billingEmail: req.body.billingEmail,
        vatIdentifier:  req.body.vatIdentifier,
        billingName:  req.body.billingName,
        billingAddress:  req.body.billingAddress,
        billingPostcode:  req.body.billingPostcode,
        billingCity:  req.body.billingCity,
        Country:  req.body.Country,
        AuthEmail:  req.body.AuthEmail
      });

   mongoose.connection.collection('Billing').insertOne(CustomerBilling, (err, result) => {
       if (err) res.status(503).send(JSON.stringify('Server Issue'));
        res.status(200).send(JSON.stringify('Record Added SucessFully'));  
   })
}


exports.paymentStripe =  (req,res) => {
    const PaymentData = {
      Token: req.body.token,
      Email: req.body.Email,
      Price: req.body.Price
    };

 const amt = parseInt(PaymentData.Price);
 const data =  amt + '99';
    var charge =  stripe_payment.charges.create({
      amount: data,
      currency:'usd',
      source:PaymentData.Token,
      statement_descriptor: 'Custom descriptor',
      receipt_email: PaymentData.Email,
      description: 'Purchase plan',
    },(err,result)=>{
      if (err) console.log(err);
     res.status(200).send(JSON.stringify(result));
    });
  
  }
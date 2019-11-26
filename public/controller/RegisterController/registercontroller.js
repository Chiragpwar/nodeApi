const mongoose = require("mongoose");
const CommenModal = require("../../modal/customModal");
const ObjectId = require("mongoose").Types.ObjectId;
const mail = require("../mail/mailController");
var verificationcode = "";
var Email = "";

exports.Registeruser = (req, res) => {

  const UserData = new CommenModal.RegisterModal({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    name: req.body.name,
    photoUrl: req.body.photoUrl,
    provider: req.body.provider
  });

  UserData.email = UserData.email.toLowerCase();
  mongoose.connection.db.collection("register").findOne({
    email: UserData.email
  }, (err, result) => {
    if (err)  
      res.send(err);
    if (result == null) {
      mongoose.connection.db.collection("register").insertOne(UserData, (err, result) => {
        if (result.provider == undefined) {
          mail.Sendmail(req, res);
          Email = UserData.email;
          verificationcode = req.session.random;
          res.status(200).send(JSON.stringify({user: `Confirmation code send in your email - ${UserData.email}`}));
        } else {
          res.status(200).send(JSON.stringify({user: result.ops[0]}));
        }
      });
    } else {
      res.status(200).send(JSON.stringify({user: "user already register"}));
    }
  });
};

exports.login = (req, res) => {
  console.log('dsdasdsd');
  
  const UserData = new CommenModal.RegisterModal({email: req.body.email});
  UserData.email = UserData.email.toLowerCase();
  mongoose.connection.db.collection("register").findOne({
    email: UserData.email
  }, (err, result) => {
    if (err) 
      res.send(err);
      if (result != null){
        mail.Sendmail(req, res);
        Email = result.email;
        verificationcode = req.session.random;
        res.status(200).send(JSON.stringify({user: `Confirmation code send in your email - ${result.email}`}));
      } else {
        res.status(200).send(JSON.stringify({user: 'User not found'}));
      }
    
  });
};


exports.Signinlogin = (req, res) => {
  const UserData = new CommenModal.RegisterModal({email: req.body.email});
  UserData.email = UserData.email.toLowerCase();
  mongoose.connection.db.collection("register").findOne({
    email: UserData.email
  }, (err, result) => {
    if (err) 
      res.send(err);
      res.status(200).send(JSON.stringify({user: result}));
  });
};


exports.Verification = (req, res) => {
  const code = req.params.code;
  if (verificationcode == code) {
    mongoose.connection.db.collection("register").findOne({
      email: Email
    }, (err, result) => {
      if (err) 
        res.send(err);
      if (result != null) {
        res.status(200).send(JSON.stringify({user: result}));
      }
    });
  } else {
    res.send(JSON.stringify("failure"));
  }
};

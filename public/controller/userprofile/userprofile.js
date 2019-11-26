const mongoose = require("mongoose");
const CommenModal = require("../../modal/customModal");


exports.Updateprofile = async (req, res) => {
const newdata = {
    email: req.body.email,
    name: req.body.name,
    photoUrl: req.body.photoUrl
} 
const app =  await CommenModal.RegisterModal.findOne({email: newdata.email});
const name  = req.body.name != null || req.body.name != '' ? req.body.name : app.name;
const Imageurl = req.body.photoUrl != "" ?  req.body.photoUrl : app.photoUrl;
const updatedata = {
    email: app.email,
    firstName: app.firstName,
    id: app._id,
    lastName: app.lastName,
    name: name,
    photoUrl: Imageurl,
    provider: app.provider 
}
console.log(updatedata)
 await CommenModal.RegisterModal.update(app, updatedata);
const result =  await CommenModal.RegisterModal.findOne({email: newdata.email});
res.status(200).send(JSON.stringify({user: result}));
}
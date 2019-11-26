const mongoose = require("mongoose");
const CommenModal = require("../../modal/customModal");
const ObjectId = require("mongoose").Types.ObjectId;


exports.Room = (req, res) => {
     const RoomDetail = {
        Roomname : req.body.Roomname,
        Email : req.body.Email,
        name : req.body.name,
        photoUrl: req.body.photoUrl,
     }
     mongoose.connection.db.collection("Rooms").findOne({Roomname: RoomDetail.Roomname}, (err, result) => {
         if (err) res.send(err)
         if (result != null) {
             res.status(200).send(JSON.stringify('Room Name already Exist'))
         }
         else {  
             mongoose.connection.db.collection('Rooms').insertOne(RoomDetail, (err, result) => {
                 if (err) res.send(err)
                 if (result != null) {
                    res.status(200).send(JSON.stringify(result.ops[0]));
                 }
             })
         }
     })
}


exports.getRoom = (req, res) => {
    const OwnerEmail = req.params.Owner;
    mongoose.connection.db.collection("Rooms").findOne({Email: OwnerEmail}, (err, result) => {
     if(err) res.send(err)
     if (result != null) {
         res.status(200).send(JSON.stringify(result));
     }
     else {
        res.status(200).send(JSON.stringify(`the email you are looking for -> ${OwnerEmail} is not avalible`));
     }
})

}


exports.getRooms  = (req, res) => {
    const roomname = req.params.room;
    mongoose.connection.db.collection("Rooms").findOne({Roomname: roomname}, (err, result) => {
     if(err) res.send(err)
     if (result != null) {
         res.status(200).send(JSON.stringify(result));
     }
     else {
        res.status(200).send(JSON.stringify(`the room you are looking for -> ${roomname} is not avalible`));
     }
})
}

exports.deleteRooms= (req , res) => {
   
    const room = req.params.room;
     console.log(room);
    mongoose.connection.db.collection('Rooms').deleteOne({Roomname: room}, (err, result) => {
        if (err) res.send(err);
        if (result) {
            res.status(200).send(JSON.stringify('deleted'));
        }
    })

}
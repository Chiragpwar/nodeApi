const io = require("socket.io")();
const mongoose = require('mongoose');
const user = require('../modal/customModal');
var ss = require('socket.io-stream');
var Room = '' ;


module.exports = async server => {
    // io.attach(server);
        io.attach(server, {
          pingTimeout: 60000,
          });

        io.on("connection", function(socket) {
        const socketId = socket.id;

        socket.on("join", async Roomname => {   
        await mongoose.connection.db.collection("Rooms").findOne({Roomname: Roomname}, (err, result) => {
            if (result != null) {

            }
           })
        }); 

        socket.on('message', data => {
       io.sockets.emit('message' , {
        username: data.sender,
        message: data.msg,
        time: data.time,
        pic: data.pics
       })
    })
        
        socket.on('sharescreen', stream => {   
             io.sockets.emit('sharescreen' , {
                val: stream
            })
        })

        socket.on('calluser', stream => { 
             io.sockets.emit('calluser' , {
                val: stream
            })
        })

        socket.on('setposter', poster => {
          io.sockets.emit('setposter', {
            poster : poster
          })
        })

        socket.on('Call', data => {
          io.sockets.emit('Call' , {
            video: data
          })
        })

        
        socket.on('CloseStream', data => {
       
          io.sockets.emit('CloseStream' , {
            stream: data.stream
          })
        })
    })
}






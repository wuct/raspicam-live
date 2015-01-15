var fs = require('fs');
var io = require('socket.io-client');
var ss = require('socket.io-stream');

var socket = io.connect('http://local.host:3000/user');
var stream = ss.createStream();
var filename = 'pic.jpg';

ss(socket).emit('profile-image', stream, {name: filename});
fs.createReadStream(filename).pipe(stream);
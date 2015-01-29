# raspicam-live
It's a live streaming webcam built around Raspberry, Node.js, Socket.io and React.

[部落格](http://blog.craftbeer.tw/make-your-own-dropcam-with-raspberry-pi-and-node-js/)

## To Use
![structure](http://blog.craftbeer.tw/content/images/2015/01/raspicam-structure-001-4.jpg)


### Server
Start a server on port `3000`.

	npm run start

Start a server on port `80`.

	NODE_ENV=production npm run start

### Client
Start a client, and connect to a server (default to `http://localhost:3000`).

	node client/client


Specify a url of a server.

	SERVER_URL=http://example.com node client/client

In addition, this command accepts two arguments: test-mode flag and timelapse (default to 150 ms). By enabling test mode, a client will emit the image files in the `client/lib` folder instead of taking pictures from a raspicam. It's useful when you want to test a server without a rapicam.

	# To take photos every 1000 ms
	node client/client 1000
	# To use test mode
	node client/client test
	# To user test mode and to emit images every 1000 ms
	node client/client test 1000

## To Develop
`nodemon` a server on port `3000` and start a webpack-dev-server on port `8080`

	npm run start:watch


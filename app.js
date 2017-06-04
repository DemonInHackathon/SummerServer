const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server)

app.set('view engine', 'jade')
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/assets'))

app.get('/', (req, res) => {
    res.render('index', {title: "Hello", message: "Hello World!"})
})

app.get('/room', (req, res) => {
    res.render('room')
})


server.listen(4321, '0.0.0.0', () => {
    console.log('server running http://localhost:4321');
})

io.on('connection', socket => {
  console.log("logged in!!")
  socket.emit("update location", 100, 100)
  // when the client emits 'message', this listens and executes
  socket.on("update location", (dataX, dataY) => {
    // we tell the client to execute 'update location'
    socket.emit("update location", dataX, dataY)

    console.log(dataX, dataY)
  })

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    console.log("Goodbye!")
  })
})
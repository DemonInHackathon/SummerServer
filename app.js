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

server.listen(4321, () => {
    console.log('server running http://localhost:4321');
})

io.on('connection', socket => {
  console.log("logged in!!")
  // when the client emits 'new message', this listens and executes
  socket.on('location update', data => {
    // we tell the client to execute 'new message'
    socket.emit('location update', {
      x: data.x,
      y: data.y
    })

    console.log(data)
  })

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    
  })
})
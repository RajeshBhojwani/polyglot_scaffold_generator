const express = require('express')
const app = express()
const port = 8080


app.get('/', (request, response) => {
               
                                             
console.log("Hello");


  
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log('server is listening on'+ port);
})

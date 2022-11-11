const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const path = require('path')


// (.html)? -> Makes the html tag optional
// ^ -> Starts with "/"
// | -> Or

app.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.get('/new_page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new_page.html'))
})

// Example for redirect

app.get('/old_page(.html)?',(req,res)=>{
    res.redirect(301,'/new_page.html') // 302 by default , here we are marking right status code for redirect

})

// Route Handlers
// Chaning 1

app.get('/hello',(req,res,next)=>{
    console.log('Attempting the ');
    next()
},(req,res)=>{
    res.send('Hello from chaning')
})

// Chain 2
const one = (req,res,next)=>{
    console.log('One')
    next()
}
const two = (req,res,next)=>{
    console.log('Two')
    next()
}
const three = (req,res)=>{
    console.log('Three')
    res.send('Finshed')
}

app.get('/chaining',[one,two,three])

// chain 3

const cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  const cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  app.get('/merge', [cb0, cb1], (req, res, next) => {
    console.log('the response will be sent by the next function ...')
    next()
  }, (req, res) => {
    res.send('Hello from D!')
  })

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(PORT,()=>console.log('Runnung on '+PORT))
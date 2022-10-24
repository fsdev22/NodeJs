const fs = require('fs')
fs.writeFile('mytest.txt','Hello World',(err)=>{
    if (err) throw err;
    fs.readFile('mytest.txt',(err,data)=>{
        if (err) throw err;
        console.log(data.toString())
        fs.appendFile('mytest.txt','\n New Words',(err)=>{
            if(err) throw err;
            console.log('Appended')
            fs.rename('mytest.txt','newFile.txt',(err)=>{
                if (err) throw err;
            })
        })
    })
})
process.on('uncaughtException',(err)=>{
    console.log(err)
})
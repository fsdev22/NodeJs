const http = require('http')
const path = require('path')
const fs = require('fs')
const fspromises = require('fs').promises
const EventEmitter = require('events')
const logFiles = require('./LogE')
class Emitter extends EventEmitter{}

const myEmit = new Emitter()
myEmit.on('log',(message,filename)=>logFiles(message,filename))

const serverFile = async(filepath , contentType , response)=>{
    try {

        const raw_data = await fspromises.readFile(filepath,
            !contentType.includes('image')?'utf-8': ''
            )
        const data = contentType === 'application/json'?JSON.parse(raw_data):raw_data
        response.writeHead(200,{'content-type':contentType})
        response.end(data)

    } catch (error) {
        console.log(error.message)
    }
}

const server = http.createServer((req,res)=>{
    console.log(req.url)
    const extensionName = path.extname(req.url)
    let contentType;

    switch(extensionName){
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.jpg':
            contentType = 'image/png'
            break
        default:
            contentType = 'text/html'
    }

    let filePath = req.url==='home' || req.url==='/'? path.join(__dirname,'files','index.html'):
                    path.join(__dirname+req.url)
    console.log('FilePath '+filePath)
    myEmit.emit('log',`${filePath}\t${req.method}`,'eventlog.txt')
    const fileExist = fs.existsSync(filePath)
    if(fileExist){
        serverFile(filePath,contentType,res)
    }else{
        
        res.writeHead(404,{"Content-Type": "text/html"})
        res.write('404 Error'); //write a response to the client
        myEmit.emit('log',`${filePath}`,'errLog.txt')
        res.end();
        // res.end('404 Error')
    }


}).listen(8000)
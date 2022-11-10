const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')

const LogE =async(message,filename)=>{
    const logItem = ` ${message} \n`
    try{
        if(!fs.existsSync(path.join(__dirname,'logs'))){
            await fsp.mkdir(path.join(__dirname,'logs'))
        }
        await fsp.appendFile(path.join(__dirname,'logs',filename),logItem)

    }catch(err){
        console.log(err)
    }
}
module.exports = LogE
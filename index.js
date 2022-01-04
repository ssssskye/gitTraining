// const mongoose = require('mongoose');
// const userSchema = require('./user');


// const main = async()=>{
//     //Connect
//     await mongoose 
//         .connect('mongodb://localhost:27017/training')
//         .then((callback))
// }



// require('dotenv').config();
// console.log(process.env.VERSION);


const http = require('http');
const { waitForDebugger } = require('inspector');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log(`before wait: ${new Date()}`);
    wait(10);
    console.log(`after wait: ${new Date()}`);
    res.end('Hello world');
})

const wait = async () =>{
    console.log(`before sleep:${new Date()}`);
    await sleep(10);
    console.log(`after sleep:${new Date()}`);
}

const sleep = async(seconds)=>{
    return new Promise(function(resolve){
        setTimeout(resolve, seconds*1000);
    })
}

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`)
})
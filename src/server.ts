import {createServer, IncomingMessage, Server, ServerResponse} from "http"
import { json } from "stream/consumers";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse)=>{
    const url = req.url
    const method = req.method

    if(url === "/" && method === "GET"){
        // console.log("This is root Route")
        res.writeHead(200, {"content-tpe": "application/json"});
        res.end(JSON.stringify({massage: "This is Root Route"}))

    }else if(url?.startsWith("/products")){
        res.writeHead(200, {"content-tpe": "application/json"});
        res.end(JSON.stringify({massage: "This is /Product Route"}))
    } else{ 
        res.writeHead(400, {"content-tpe": "application/json"});
        res.end(JSON.stringify({msg: "This Rote is not Found !!"}))
    }
})

server.listen(5000, ()=>{
    console.log(`Server on Running at http://localhost:5000/`);
})
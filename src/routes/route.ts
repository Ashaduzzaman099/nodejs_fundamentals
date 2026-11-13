import { IncomingMessage, ServerResponse } from 'http';
import productController from '../controllers/product.controllers';
const routerHandler = (req: IncomingMessage, res: ServerResponse)=>{
    
    const url = req.url
    const method = req.method

    if(url === "/" && method === "GET"){
        // console.log("This is root Route")
        res.writeHead(200, {"content-tpe": "application/json"});
        res.end(JSON.stringify({massage: "This is Root Route"}))

    }else if(url?.startsWith("/products")){
        productController(req, res);
    } else{ 
        res.writeHead(400, {"content-tpe": "application/json"});
        res.end(JSON.stringify({msg: "This Rote is not Found !!"}))
    }
}

export default routerHandler;
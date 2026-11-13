import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../services/product.service";
import type { Iproduct } from "../type/product";
import { bodyParser } from "../utils/parseBody";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    const urlParams = url?.split("/");
    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
    
    if (url === "/products" && method === "GET") {
        const product = productService()

        res.writeHead(200, { "content-tpe": "application/json" })
        res.end(JSON.stringify({
            massage: "Product Recevied Successfully !!",
            data: product,
        }));
    }else if(method === "GET" && id !== null){
        const products = productService()
        const product = products.find((p:Iproduct)=> p.id===id);
        console.log(product);
        res.writeHead(200, { "content-tpe": "application/json" })
        res.end(JSON.stringify({
            massage: "Product Recevied Successfully !!",
            data: product,
        }));
    }else if(method === "POST" && url === "/products" ){
        const body = await bodyParser(req)
       console.log(body)
        res.writeHead(201, { "content-tpe": "application/json" })
        res.end(JSON.stringify({
            massage: "Product Created Successfully !!",
            // data: product,
        }));
    }

}

export default productController;
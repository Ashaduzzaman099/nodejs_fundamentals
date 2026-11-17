import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../services/product.service";
import type { Iproduct } from "../type/product";
import { bodyParser } from "../utils/parseBody";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    const urlParams = url?.split("/");
    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

    if (url === "/products" && method === "GET") {
        const product = productService()

        if(!product ){
            res.writeHead(404, { "content-tpe": "application/json" })
            res.end(JSON.stringify({
            massage: "Product Not Found !!",

            }));
        }

        res.writeHead(200, { "content-tpe": "application/json" })
        res.end(JSON.stringify({
            massage: "Product Recevied Successfully !!",
            data: product,
        }));
    }else if(method === "GET" && id !== null){
        const products = productService()
        const product = products.find((p:Iproduct)=> p.id===id);

        res.writeHead(200, { "content-tpe": "application/json" })
        res.end(JSON.stringify({
            massage: "Product Recevied Successfully !!",
            data: product,
        }));
    }else if(method === "POST" && url === "/products" ){
        const body = await bodyParser(req)

        res.writeHead(201, { "content-tpe": "application/json" })
        res.end(JSON.stringify({
            massage: "Product Created Successfully !!",
            data: body,
        }));
    }else if(method === "PUT" && id !== null){
        const body = await bodyParser(req)
        const products = productService()
        const index = products.findIndex((p:Iproduct)=> p.id === id);

        if(index < 0 ){
            res.writeHead(404, { "content-tpe": "application/json" })
            res.end(JSON.stringify({
            massage: "Product Not Found !!",
            // data: product,
            }));
        }

        // console.log(products[index])
        products[index] = {id: products[index].id, ...body};
        createProduct(products);

        res.writeHead(200, { "content-tpe": "application/json" })
        res.end(JSON.stringify({
            massage: "Product Updated Successfully !!",
            data: products[index],
        }));
    }else if(method === "DELETE" && id !== null){
      const products = productService()

      const index = products.findIndex((p:Iproduct)=> p.id === id);
        if(index < 0 ){
            res.writeHead(404, { "content-tpe": "application/json" })
            res.end(JSON.stringify({
            massage: "Product Not Found !!",
            // data: product,
            }));
        }

        products.splice(index,1);
        createProduct(products);

      res.writeHead(200, { "content-tpe": "application/json" })
        res.end(JSON.stringify({
            massage: "Product Delete Successfully !!"
        }));
    }

}

export default productController;
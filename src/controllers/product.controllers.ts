import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../services/product.service";
import type { Iproduct } from "../type/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

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

        try{
          sendResponse(res,true,200,"Product Recevied Successfully !!", product)
        }catch(error){
          sendResponse(res,false,500,"Internal Server Error!!")
        }

    }else if(method === "GET" && id !== null){
        try{
          const products = productService()
          const product = products.find((p:Iproduct)=> p.id===id);
          if(!product ){
              return sendResponse(res,false,404,"Product not Found !!")
          }
          sendResponse(res,true,200,"Product Recevied Successfully !!", product)
        }catch(error){
          sendResponse(res,false,500,"Internal Server Error!!")
        }
    }else if(method === "POST" && url === "/products" ){

        try{
          const body = await bodyParser(req)
          sendResponse(res,true,201,"Product Created Successfully !!", body)
        }catch(error){
          sendResponse(res,false,500,"Internal Server Error!!")
        }
    }else if(method === "PUT" && id !== null){

      try{
        const body = await bodyParser(req)
        const products = productService()
        const index = products.findIndex((p:Iproduct)=> p.id === id);

        if(index < 0 ){
            return sendResponse(res,false,404,"Product not Found !!")
        }

        // console.log(products[index])
        products[index] = {id: products[index].id, ...body};
        createProduct(products);
        sendResponse(res,true,200,"Product Updated Successfully !!", products[index])
      }catch(error){
          sendResponse(res,false,500,"Internal Server Error!!")
      }

    }else if(method === "DELETE" && id !== null){

      try{
        const products = productService()
        const index = products.findIndex((p:Iproduct)=> p.id === id);
          if(index < 0 ){
            return sendResponse(res,false,404,"Deleted Product not Found !!")

          }

          products.splice(index,1);
          createProduct(products);
          sendResponse(res,true,200,"Product Delete Successfully !!")

      }catch(error){
           sendResponse(res,false,404,"Deleted Product not Found !!")
      }

    }

}

export default productController;
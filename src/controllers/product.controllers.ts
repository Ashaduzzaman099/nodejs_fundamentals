import type { IncomingMessage, ServerResponse } from "http";

const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    if (url === "/products" && method === "GET") {
        const products = [
            {
                id: 1,
                name: "product-1",
                price: 20

            },

            {
                id: 2,
                name: "Mango",
                price: 40

            },

        ]

        res.writeHead(200, { "content-tpe": "application/json" })
        res.end(JSON.stringify({
            massage: "Product Recevied Successfully !!",
            data: products,
        }));
    }

}

export default productController;
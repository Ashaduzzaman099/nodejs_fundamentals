import type { ServerResponse } from "http";

export const sendResponse = (res : ServerResponse, success:boolean, statusCode: number, message: string, data?:any)=>{
  const response ={
    success,
    message,
    data
  }
  res.writeHead(statusCode, { "content-tpe": "application/json" })
    res.end(JSON.stringify(response));

}
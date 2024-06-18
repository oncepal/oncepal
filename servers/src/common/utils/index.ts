import { Response } from "express";

export function error(res:Response,code:number,message:string){
   return res.status(code).json({ message: message }) 
}
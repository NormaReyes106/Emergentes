import { Request, Response } from "express";
import Client from "../models/Client.model";

export const createClient = async (req: Request, res: Response) => {
    const client = await Client.create(req.body);  
    res.json({data: client}) 
}




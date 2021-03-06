import { Request, Response } from "express";
import { AddSongService } from "../services/AddSongService";

export class AddSongController {
    
    async handle(req: Request, res: Response): Promise<Response>{
        const { name, youtubeLink } = req.body;
        
        if (!name || !youtubeLink){
            return res.sendStatus(400);
        }
        const addSongService = new AddSongService();
        let message:string;
        try{
            const status = await addSongService.execute({
                name,
                youtubeLink
            });

            if (status === 201){
                message = "OK!"
                return res.status(status).send(message);
            }
            if (status === 400){
                return res.sendStatus(400);
            }
            if (status === 409){
                message = "Song already exists!"
                return res.status(status).send(message);
            }
        }catch(err){
            return res.status(500).json({
                message: err.message || "Unexpected Error."
            });
        };
    };
};
 
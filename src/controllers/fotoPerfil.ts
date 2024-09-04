import ModelUser from "../models/usuario";
import { Request, Response } from "express";
import fs from "fs-extra";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
// console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

export async function subirFoto(req: Request, res:Response):Promise<Response> {
    try{

        const id = req.params.id;
        if (!req.file) {
            throw new Error('No hay foto')
        }
        const resultado = await cloudinary.uploader.upload(req.file.path);

        const user = await ModelUser.findById(id)
        if (!user) {
            return res.status(400).json({message: 'No existe el usuario'})
        }

        user.url_foto = resultado.secure_url;
        user.public_id = resultado.public_id;

        await user.save();
        await fs.unlink(req.file.path);
        return res.json({
            message:'foto guardada',
            user
        })
    }catch(error: unknown){
        const mensageError = (error instanceof Error) ? error.message: 'Error internoo'
        return res.status(500).json({
            message: 'La foto no se guardo',
            error: mensageError
        })
    }
}

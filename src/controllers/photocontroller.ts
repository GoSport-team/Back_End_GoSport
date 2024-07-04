import { Request, Response } from "express";
import  Photos  from "../models/photomodel";
import fs from "fs-extra";
import path from "path";

export async function Getphoto(_req:Request, res:Response){

    const photos= await Photos.find()
    return res.json(photos);


}
export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { Nombre, Descripcion } = req.body;
    const newPhoto = {
        Nombre,
        Descripcion,
        Imagepath: req.file?.path
    };
    
    try {
        const photo = new Photos(newPhoto)
        await photo.save();
        return res.json({
            message: 'Photo saved successfully',
            photo
        });
    } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(500).json({
            message: 'Error saving photo',
            error: errorMessage
        });
    }
}

export async function DeletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photos.findByIdAndDelete(id);
    if (photo) {
        const imagePath = photo.Imagepath;
        if (imagePath) {
            try {
                await fs.unlink(path.resolve(imagePath));
            } catch (error: unknown) {
                let errorMessage = 'Unknown error';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                return res.status(500).json({
                    message: 'Error deleting photo from filesystem',
                    error: errorMessage
                });
            }
        }
        return res.json({
            message: 'Photo deleted',
            photo
        });
    } else {
        return res.status(404).json({
            message: 'Photo not found'
        });
    }
}

export async function UpdatePhoto(req: Request, res: Response): Promise<Response> {
    const {id}=req.params;
    const {Nombre, Descripcion}=req.body;
    console.log(req.body)
    const Updatefoto=await Photos.findByIdAndUpdate(id,{
        Nombre,Descripcion
    })
    return res.json({
        message:'foto actualizada',
        Updatefoto
    })
}

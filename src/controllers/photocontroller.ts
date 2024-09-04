import { Request, Response } from "express";
import Photos from "../models/photomodel";
import fs from "fs-extra";
import { v2 as cloudinary } from 'cloudinary';  

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
// console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);
// Función para obtener fotos
export async function Getphoto(_req: Request, res: Response) {
    const photos = await Photos.find();
    return res.json(photos);
}

// Función para crear una nueva foto
export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const { Nombre, Descripcion } = req.body;
    try {
        if (!req.file) {
            throw new Error('File not provided');
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        const newPhoto = {
            Nombre,
            Descripcion,
            ImageUrl: result.secure_url,
            public_id: result.public_id
        };

        const photo = new Photos(newPhoto);
        await photo.save();

        // Eliminar archivo local
        await fs.unlink(req.file.path);

        return res.json({
            message: 'Photo saved successfully',
            photo
        });
    } catch (error: unknown) {
        const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
        console.error(error); // Log error details
        return res.status(500).json({
            message: 'Error saving photo',
            error: errorMessage
        });
    }
}

// Función para eliminar una foto
export async function DeletePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const photo = await Photos.findByIdAndDelete(id);
    if (photo) {
        try {
            await cloudinary.uploader.destroy(photo.public_id);
        } catch (error) {
            let errorMessage = 'Unknown error';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return res.status(500).json({
                message: 'Error deleting photo from Cloudinary',
                error: errorMessage
            });
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

// Función para actualizar una foto
export async function UpdatePhoto(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { Nombre, Descripcion } = req.body;
    const updatedPhoto = await Photos.findByIdAndUpdate(id, {
        Nombre, Descripcion
    }, { new: true });
    return res.json({
        message: 'Photo updated',
        updatedPhoto
    });
}

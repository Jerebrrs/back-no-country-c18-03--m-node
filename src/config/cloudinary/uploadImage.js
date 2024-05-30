import cloudinary from './cloudinary.js';
import { AppError } from '../../errors/appError.js';
import fs from 'fs';
import util from 'util';
import { errorMessagesCloudinary } from '../../common/utils/errorsMessages.js'

const unlinkFile = util.promisify(fs.unlink);

export const uploadImageToCloudinary = async (req, res, next) => {
    if (req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);
            req.body.image = result.secure_url;
            await unlinkFile(req.file.path); // Eliminar el archivo local después de subirlo a Cloudinary
            next();
        } catch (error) {
            return next(new AppError(errorMessagesCloudinary.cloudinaryUploadError, 500));
        }
    } else {
        return next(new AppError(errorMessagesCloudinary.noImageFileProvided, 400));
    }
};

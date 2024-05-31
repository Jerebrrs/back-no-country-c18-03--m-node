import { errorMessagesEntities } from '../../common/utils/errorsMessages.js';
import { catchAsync, AppError } from '../../errors/index.js'
import { EntitiesService } from './entities.service.js'
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { envs } from '../../config/enviroments/enviroments.js';

const entitiesService = new EntitiesService()

export const validateExistEntity = catchAsync(async (req, res, next) => {
    const { id, entityId } = req.params;

    const entity = await entitiesService.findOneEntities(id, entityId)

    if (!entity) {
        return next(new AppError(errorMessagesEntities.entityNotExist, 404))
    }

    req.entity = entity
    next()
})

export const protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError('Este no es tu token', 401)
        );
    }

    const decoded = await promisify(jwt.verify)(
        token,
        envs.SECRET_JWD_SEED
    );

    const entity = await entitiesService.findOneEntities(decoded.id)

    if (!entity) {
        return next(
            new AppError('The owner of this token it not longer available', 401)
        );
    }

    req.sessionEntity = entity;
    next();
});
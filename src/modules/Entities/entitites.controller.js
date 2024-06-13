import { catchAsync, AppError } from '../../errors/index.js'
import { validateRegisterEntities, validatePartialEntities } from './entitites.schema.js'
import { EntitiesService } from './entities.service.js'
import generateJWT from '../../config/plugins/generate-JWT.js';
import { errorMessagesEntities } from '../../common/utils/errorsMessages.js';
import { sucessMessage } from '../../common/utils/sucessMessage.js';

export const entitiesService = new EntitiesService()

export const findAllEntities = catchAsync(async (req, res, next) => {
    const entities = await entitiesService.findAllEntities()

    return res.status(200).json(entities)
})

export const findOneEntity = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const entity = await entitiesService.findOneEntities(id)

    if (!entity) {
        return next(new AppError(errorMessagesEntities.entityNotExist, 404))
    }

    return res.status(200).json(entity)
})

export const registerEntities = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, entitiesData } = validateRegisterEntities(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const entity = await entitiesService.createEntities(entitiesData)

    const token = await generateJWT(entity.id)

    res.status(201).json({
        token,
        entity: {
            name: entity.name,
            email: entity.email,
            surname: entity.surname,
            entityName: entity.entityName
        }
    })
})

export const updateEntities = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, entitiesData } = validatePartialEntities(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages
        })
    }

    const { id } = req.params;

    const entity = await entitiesService.findOneEntities(id)

    if (!entity) {
        return next(new AppError(errorMessagesEntities.entityNotExist, 404))
    }

    const updatedEntities = await entitiesService.updateEntities(entity, entitiesData)

    return res.status(200).json(updatedEntities)
})

export const deleteEntity = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const entity = await entitiesService.findOneEntities(id)

    if (!entity) {
        return next(new AppError(errorMessagesEntities.entityNotExist, 404))
    }

    await entitiesService.deleteEntities(entity)

    return res.status(200).json(sucessMessage.entityDelete)
})
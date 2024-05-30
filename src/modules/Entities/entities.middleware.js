import { errorMessagesEntities } from '../../common/utils/errorsMessages.js';
import { catchAsync, AppError } from '../../errors/index.js'
import { EntitiesService } from './entities.service.js'

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
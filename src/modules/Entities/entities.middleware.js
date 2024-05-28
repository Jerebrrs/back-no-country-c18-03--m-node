import { catchAsync, AppError } from '../../errors/index.js'
import { EntitiesService } from './entities.service.js'

const entitiesService = new EntitiesService()

export const validateExistEntity = catchAsync(async (req, res, next) => {
    const { id, entityId } = req.params;

    const entity = entitiesService.findOneEntities(id, entityId)

    if (!entity) {
        next(new AppError(`Entity whit id ${id} not found`, 404))
    }

    req.entity = entity
    next()
})
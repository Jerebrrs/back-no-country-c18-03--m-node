import express from 'express'
import {
    findAllEntities,
    findOneEntity,
    registerEntities,
    updateEntities,
    deleteEntity
} from './entitites.controller.js'
import { protect, validateExistEntity } from './entities.middleware.js'

export const router = express.Router();

router.post('/register', registerEntities)

router.route('/')
    .get(findAllEntities)

router.route('/:id')
    .get(validateExistEntity, findOneEntity)
    .patch(protect, updateEntities)
    .delete(protect, deleteEntity)



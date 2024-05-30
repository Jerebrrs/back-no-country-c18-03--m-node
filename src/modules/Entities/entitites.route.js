import express from 'express'
import {
    findAllEntities,
    findOneEntity,
    registerEntities,
    updateEntities,
    deleteEntity
} from './entitites.controller.js'
import { validateExistEntity } from './entities.middleware.js'
import { protect, protectAccountOwner } from '../Users/users.middleware.js'

export const router = express.Router();

router.post('/register', registerEntities)

router.route('/')
    .get(findAllEntities)

router.route('/:id')
    .get(validateExistEntity, findOneEntity)
    .patch(protect, protectAccountOwner, updateEntities)
    .delete(protect, protectAccountOwner, deleteEntity)



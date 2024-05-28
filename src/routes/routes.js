import express from 'express';
import { router as userRouter } from "../modules/Users/users.route.js"
import { router as entitiesRouter } from '../modules/Entities/entitites.route.js'
import { router as mpRouter } from '../mercadopago/mp.router.js'
import { router as campaignRouter } from '../modules/Campaign/campaign.route.js'
export const router = express.Router()

router.use("/users", userRouter)
router.use("/entities", entitiesRouter)
router.use("/mp", mpRouter)
router.use("/campaign", campaignRouter)

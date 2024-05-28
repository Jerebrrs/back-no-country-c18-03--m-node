import express from 'express';
import { createDonation } from './payment.controllers.js'

export const router = express.Router();

router.post('/create', createDonation)
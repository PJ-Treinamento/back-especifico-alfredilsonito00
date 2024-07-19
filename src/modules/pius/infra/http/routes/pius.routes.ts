import { Router } from 'express';

import { param } from 'express-validator';
import verifyValidationResult from '@shared/infra/http/middlewares/validationResults';
import PiusController from '../controller/PiusController';

const piusRoutes = Router();

const piusController = new PiusController();

piusRoutes.post('/create', piusController.create);

piusRoutes.get('/readAll', piusController.readAll);
piusRoutes.get('/read/:id', param('id').isUUID(), piusController.read);
piusRoutes.delete('/delete/:id', param('id').isUUID(), piusController.delete);

piusRoutes.patch('/update/:id',
  param('id').isUUID(),
  verifyValidationResult,
  piusController.update);

export default piusRoutes;

import { Router } from 'express';

import { param } from 'express-validator';
import verifyValidationResult from '@shared/infra/http/middlewares/validationResults';
import ensureAutenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PiusController from '../controller/PiusController';

const piusRoutes = Router();

const piusController = new PiusController();

piusRoutes.post('/create', ensureAutenticated, piusController.create);

piusRoutes.get('/readAll', piusController.readAll);
piusRoutes.get('/read/:id', param('id').isUUID(), piusController.read);
piusRoutes.delete('/delete/:id', ensureAutenticated, param('id').isUUID(), piusController.delete);

piusRoutes.patch('/update/:id', ensureAutenticated,
  param('id').isUUID(),
  verifyValidationResult,
  piusController.update);

export default piusRoutes;

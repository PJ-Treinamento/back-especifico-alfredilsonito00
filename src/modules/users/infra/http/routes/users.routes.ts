import { Router } from 'express';

import { param } from 'express-validator';
import verifyValidationResult from '@shared/infra/http/middlewares/validationResults';
import ensureAutenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', usersController.createMiddleware, verifyValidationResult, usersController.create);

usersRoutes.get('/readAll', usersController.readAll);
usersRoutes.get('/read/:id', param('id').isUUID(), usersController.read);
usersRoutes.delete('/delete/:id', ensureAutenticated, param('id').isUUID(), usersController.delete);

usersRoutes.patch('/update/:id', ensureAutenticated, usersController.updateMiddleware, verifyValidationResult, usersController.update);

export default usersRoutes;

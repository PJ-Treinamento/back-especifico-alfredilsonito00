import { Router } from 'express';

import { body, param } from 'express-validator';
import verifyValidationResult from '@shared/infra/http/middlewares/validationResults';
import isCpf from '@shared/utils/isCpf';
import UsersController from '../controller/PiusController';

const piusRoutes = Router();

const usersController = new UsersController();

piusRoutes.post('/create', usersController.create);

piusRoutes.get('/readAll', usersController.readAll);
piusRoutes.get('/read/:id', param('id').isUUID(), usersController.read);
piusRoutes.delete('/delete/:id', param('id').isUUID(), usersController.delete);

piusRoutes.patch('/update/:id',
  param('id').isUUID(),
  body('name').isString().isLength({ min: 1 }).withMessage('digite um nome válido'), /* a mensagem não tá indo */
  body('email').isEmail().isLength({ min: 1 }).withMessage('digite um email válido'),
  body('phone').isMobilePhone('pt-BR').withMessage('digite um número válido'),
  body('cpf').custom(isCpf),
  verifyValidationResult,
  usersController.update);

export default piusRoutes;

import { Router } from 'express';

import { body, param } from 'express-validator';
import verifyValidationResult from '@shared/infra/http/middlewares/validationResults';
import isCpf from '@shared/utils/isCpf';
import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register',
  body('name').isString().isLength({ min: 1 }).withMessage('digite um nome válido'), /* a mensagem não tá indo */
  body('email').isEmail().isLength({ min: 1 }).withMessage('digite um email válido'),
  body('phone').isMobilePhone('pt-BR').withMessage('digite um número válido'),
  body('cpf').custom(isCpf),
  body('password').isString().isLength({ min: 1 }).withMessage('digite uma senha válida'),
  verifyValidationResult,
  usersController.create);

usersRoutes.get('/readAll', usersController.readAll);
usersRoutes.get('/read/:id', param('id').isUUID(), usersController.read);
usersRoutes.delete('/delete/:id', param('id').isUUID(), usersController.delete);

usersRoutes.patch('/update/:id',
  param('id').isUUID(),
  body('name').isString().isLength({ min: 1 }).withMessage('digite um nome válido'), /* a mensagem não tá indo */
  body('email').isEmail().isLength({ min: 1 }).withMessage('digite um email válido'),
  body('phone').isMobilePhone('pt-BR').withMessage('digite um número válido'),
  body('cpf').optional().custom(isCpf),
  verifyValidationResult,
  usersController.update);

export default usersRoutes;

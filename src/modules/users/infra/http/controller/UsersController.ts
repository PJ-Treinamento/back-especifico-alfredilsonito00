import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ReadAllUsersService from '@modules/users/services/ReadAllUsersService';
import ReadUserService from '@modules/users/services/ReadUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import isCpf from '@shared/utils/isCpf';
import { body, param } from 'express-validator';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      phone,
      password,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      cpf,
      phone,
      password,
    });

    user.password = '###';

    return res.status(201).json(user);
  }

  public async readAll(req:Request, res:Response): Promise<Response> {
    const readUsers = container.resolve(ReadAllUsersService);

    const users = await readUsers.execute();

    return res.status(201).json(users);
  }

  public async read(req:Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const readUser = container.resolve(ReadUserService);

    const user = await readUser.execute(id);

    return res.status(201).json(user);
  }

  public async delete(req:Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteUserService);

    const deletedUser = await deleteUser.execute(id);

    return res.status(201).json(deletedUser);
  }

  public async update(req:Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
    } = req.body;

    const updateUser = container.resolve(UpdateUserService);

    const updatedUser = await updateUser.execute({
      id, name, email, phone,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = updatedUser;

    return res.status(201).json(userWithoutPassword);
  }

  public createMiddleware = [
    body('name').isString().isLength({ min: 1 }).withMessage('digite um nome válido'),
    body('email').isEmail().isLength({ min: 1 }).withMessage('digite um email válido'),
    body('phone').isMobilePhone('pt-BR').withMessage('digite um número válido'),
    body('cpf').custom(isCpf),
    body('password').isString().isLength({ min: 1 }).withMessage('digite uma senha válida')];

  public updateMiddleware = [
    param('id').isUUID(),
    body('name').isString().isLength({ min: 1 }).withMessage('digite um nome válido'),
    body('email').isEmail().isLength({ min: 1 }).withMessage('digite um email válido'),
    body('phone').isMobilePhone('pt-BR').withMessage('digite um número válido'),
    body('cpf').optional().custom(isCpf),
  ]
}

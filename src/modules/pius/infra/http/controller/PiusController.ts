import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePiuService from '@modules/pius/services/CreatePiuService';
import UpdatePiuService from '@modules/pius/services/UpdatePiuService';
import DeletePiuService from '@modules/pius/services/DeletePiuService';
import ReadPiuService from '@modules/pius/services/ReadPiuService';
import ReadAllPiusService from '@modules/pius/services/ReadAllPiusService';

export default class PiusController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      userid,
      texto,
    } = req.body;

    const createPiu = container.resolve(CreatePiuService);

    const piu = await createPiu.execute({
      userid,
      texto,
    });

    return res.status(201).json(piu);
  }

  public async readAll(req:Request, res:Response): Promise<Response> {
    const readUsers = container.resolve(ReadAllPiusService);

    const users = await readUsers.execute();

    return res.status(201).json(users);
  }

  public async read(req:Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const readUser = container.resolve(ReadPiuService);

    const user = await readUser.execute(id);

    return res.status(201).json(user);
  }

  public async delete(req:Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeletePiuService);

    const deletedUser = await deleteUser.execute(id);

    return res.status(201).json(deletedUser);
  }

  public async update(req:Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const {
      name,
      email,
      cpf,
      phone,
    } = req.body;

    const updateUser = container.resolve(UpdatePiuService);

    const updatedUser = await updateUser.execute({
      id, name, email, cpf, phone,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = updatedUser;

    return res.status(201).json(userWithoutPassword);
  }
}

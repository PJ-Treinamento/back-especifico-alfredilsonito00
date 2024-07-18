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
    const readPius = container.resolve(ReadAllPiusService);

    const pius = await readPius.execute();

    return res.status(201).json(pius);
  }

  public async read(req:Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const readPiu = container.resolve(ReadPiuService);

    const piu = await readPiu.execute(id);

    return res.status(201).json(piu);
  }

  public async delete(req:Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const deletePiu = container.resolve(DeletePiuService);

    const deletedPiu = await deletePiu.execute(id);

    return res.status(201).json(deletedPiu);
  }

  public async update(req:Request, res:Response) : Promise<Response> {
    const { id } = req.params;

    const {
      texto,
    } = req.body;

    const updatePiu = container.resolve(UpdatePiuService);

    const updatedPiu = await updatePiu.execute({
      id, texto,
    });

    return res.status(201).json(updatedPiu);
  }
}

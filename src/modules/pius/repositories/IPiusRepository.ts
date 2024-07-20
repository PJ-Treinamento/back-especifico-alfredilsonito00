import { Piu } from '@prisma/client';

import ICreatePiuDTO from '../dtos/ICreatePiuDTO';
import IUpdatePiuDTO from '../dtos/IUpdatePiuDTO';

interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Piu>;
  findAll():Promise<Piu[]>;
  findById(id:string): Promise<Piu| null>;
  delete(id:string): Promise<Piu>;
  update(id:string, data:IUpdatePiuDTO): Promise<Piu>;
  deleteAll(userid:string): Promise<null>;
}

export default IPiusRepository;

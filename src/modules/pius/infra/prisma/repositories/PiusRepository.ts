import prisma from '@shared/infra/prisma/client';
import { Piu, Prisma } from '@prisma/client';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';
import IUpdatePiuDTO from '@modules/pius/dtos/IUpdatePiuDTO';

export default class PiusRepository implements IPiusRepository {
  private ormRepository: Prisma.PiuDelegate<any> /* bugou então tive que mudar */

  constructor() {
    this.ormRepository = prisma.piu;
  }

  public async create(data: ICreatePiuDTO): Promise<Piu> {
    const piu = await this.ormRepository.create({ data });

    return piu;
  }

  public async findAll():Promise<Piu[]> {
    const pius = await this.ormRepository.findMany();

    return pius;
  }

  public async findById(id: string): Promise<Piu | null> {
    const piu = await this.ormRepository.findFirst({ where: { id } });

    return piu;
  }

  public async delete(id: string): Promise<Piu> {
    const deletePiu = await this.ormRepository.delete({ where: { id } });

    return deletePiu;
  }

  public async update(id:string, data:IUpdatePiuDTO): Promise<Piu> {
    const updatePiu = await this.ormRepository.update({ where: { id }, data });

    return updatePiu;
  }

  public async deleteAll(userid:string): Promise<null> {
    await this.ormRepository.deleteMany({ where: { userid } });
    return null;
  }
}

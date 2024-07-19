import prisma from '@shared/infra/prisma/client';
import { Piu, Prisma } from '@prisma/client';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';
import IUpdatePiuDTO from '@modules/pius/dtos/IUpdatePiuDTO';

export default class PiusRepository implements IPiusRepository {
  private ormRepository: Prisma.PiuDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.piu;
  }

  public async create(data: ICreatePiuDTO): Promise<Piu> { /* arrumar */
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async findAll():Promise<Piu[]> {
    const users = await this.ormRepository.findMany();

    return users;
  }

  public async findById(id: string): Promise<Piu | null> {
    const user = await this.ormRepository.findFirst({ where: { id } });

    return user;
  }

  public async delete(id: string): Promise<Piu> {
    const deleteUser = await this.ormRepository.delete({ where: { id } });

    return deleteUser;
  }

  public async update(id:string, data:IUpdatePiuDTO): Promise<Piu> {
    const updateUser = await this.ormRepository.update({ where: { id }, data });

    return updateUser;
  }
}

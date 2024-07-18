import prisma from '@shared/infra/prisma/client';
import { Prisma, Piu } from '@prisma/client';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';

export default class PiusRepository implements IPiusRepository {
  private ormRepository: Prisma.UsersDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>

  constructor() {
    this.ormRepository = prisma.users;
  }/* como criar repositório de pius????? */

  public async create(data: ICreatePiuDTO): Promise<Piu> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async findAll():Promise<Users[]> {
    const users = await this.ormRepository.findMany();

    return users;
  }

  public async findById(id: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({ where: { id } });

    return user;
  }

  public async delete(id: string): Promise<Users> {
    const deleteUser = await this.ormRepository.delete({ where: { id } });

    return deleteUser;
  }

  public async update(id:string, data:IUpdateUserDTO): Promise<Users> {
    const updateUser = await this.ormRepository.update({ where: { id }, data });

    return updateUser;
  }
}

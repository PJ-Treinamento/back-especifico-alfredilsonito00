import prisma from '@shared/infra/prisma/client';
import { Prisma, Users } from '@prisma/client';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Prisma.UsersDelegate<any> /* bugou então tive que mudar */

  constructor() {
    this.ormRepository = prisma.users;
  }

  public async findByEmailWithRelations(email: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { email },
    });

    return user;
  }

  public async findByEmailPhoneOrCpf(email: string, phone: string, cpf?: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { OR: [{ email }, { phone }, { cpf }] },
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<Users> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async findAll(): Promise<Partial<Users>[]> {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        phone: true,
        created_at: true,
        updated_at: true,
      },
    });
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

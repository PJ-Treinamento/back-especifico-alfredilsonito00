import { inject, injectable } from 'tsyringe';
import { Users } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ReadUserService {
  constructor(
        @inject('UsersRepository')
        private usersRepository : IUsersRepository,
  ) { }

  public async execute(id:string): Promise<Partial<Users>| null> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) { throw new AppError('Não existe um usuário com esse id'); }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...usersWithoutPassword } = userExists;

    return usersWithoutPassword;
  }
}

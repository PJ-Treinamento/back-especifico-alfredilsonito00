import { inject, injectable } from 'tsyringe';
import { Users } from '@prisma/client';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ReadAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(): Promise<Partial<Users>[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

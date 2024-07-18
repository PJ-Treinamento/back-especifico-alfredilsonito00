import { injectable, inject } from 'tsyringe';
import { Users } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()

export default class DeleteUserService {
  constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
  ) {}

  public async execute(id:string) : Promise<Users| null> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) { throw new AppError('User with this id does not exist'); }

    const deletedUser = await this.usersRepository.delete(id);

    return deletedUser;
  }
}

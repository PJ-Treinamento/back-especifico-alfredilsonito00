import { injectable, inject } from 'tsyringe';
import { Users } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()

export default class DeleteUserService {
  constructor(
        @inject('PiusRepository')
        private piusRepository: IPiusRepository,
  ) {}

  public async execute(id:string) : Promise<Piu | null> {
    const userExists = await this.piusRepository.findById(id);

    if (!userExists) { throw new AppError('User with this id does not exist'); }

    const deletedUser = await this.piusRepository.delete(id);

    return deletedUser;
  }
}

import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { Piu } from '@prisma/client';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()

export default class DeletePiuService {
  constructor(
        @inject('PiusRepository')
        private piusRepository: IPiusRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
  ) {}

  public async execute(id:string) : Promise<Piu | null> {
    const piuExists = await this.piusRepository.findById(id);

    if (!piuExists) { throw new AppError('piu with this id does not exist'); }

    const deletedPiu = await this.piusRepository.delete(id);

    return deletedPiu;
  }
}

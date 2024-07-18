import { inject, injectable } from 'tsyringe';

import { Piu } from '@prisma/client'; /* não sei como faz essa parte que mexe com o Prisma */

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  userid: string;
  texto: string;
}

@injectable()
export default class CreatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,

    @inject('UsersRepoitory')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    userid, texto,
  }: IRequest): Promise<Piu> {
    const userExists = await this.usersRepository.findById(userid);

    if (!userExists) throw new AppError('User with this id does not exists');

    if (texto.length === 0) { throw Error('Escreva algo para poder postar'); }
    if (texto.length > 140) { throw Error('O texto é longo demais para ser publicado'); }

    const piu = this.piusRepository.create({
      userid,
      texto,
    });

    return piu;
  }
}

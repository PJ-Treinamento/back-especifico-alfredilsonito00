import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { Piu } from '@prisma/client';
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

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    userid, texto,
  }: IRequest): Promise<Piu> {
    const userExists = await this.usersRepository.findById(userid);

    if (!userExists) throw new AppError('User with this id does not exists');

    if (texto.length === 0) { throw new AppError('Escreva algo para poder postar'); }
    if (texto.length > 140) { throw new AppError('O texto é longo demais para ser publicado'); }

    const piu = this.piusRepository.create({
      userid,
      texto,
    });

    return piu;
  }
}

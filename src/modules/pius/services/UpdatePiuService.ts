import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { Piu } from '@prisma/client';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
    id:string,
    texto:string,
}

@injectable()
export default class UpdatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) { }

  public async execute({
    id, texto,
  }: IRequest): Promise<Piu> {
    const piuExists = this.piusRepository.findById(id);

    if (!piuExists) { throw new AppError('Não existe um piu com este id'); }

    if (texto.length === 0) { throw Error('Escreva algo para poder postar'); }
    if (texto.length > 140) { throw Error('O texto é longo demais para ser publicado'); }

    const updatedUser = this.piusRepository.update(id, { texto, updated_at: new Date() });

    return updatedUser;
  }
}

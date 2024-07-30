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
    const piuExists = await this.piusRepository.findById(id);

    if (!piuExists) { throw new AppError('Não existe um piu com esse id'); }

    if (texto.length === 0) { throw new AppError('Escreva algo para poder postar'); }
    if (texto.length > 140) { throw new AppError('O texto é longo demais para ser publicado'); }

    const updatedPiu = this.piusRepository.update(id, { texto, updated_at: new Date() });

    return updatedPiu;
  }
}

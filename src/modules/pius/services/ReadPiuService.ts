import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class ReadPiuService {
  constructor(
        @inject('PiusRepository')
        private piusRepository : IPiusRepository,
  ) { }

  public async execute(id:string): Promise<Piu| null> {
    const piuExists = await this.piusRepository.findById(id);

    if (!piuExists) { throw new AppError('Não existe um piu com esse id'); }

    return piuExists;
  }
}

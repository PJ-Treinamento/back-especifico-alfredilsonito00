import { injectable, inject } from 'tsyringe';
import { Users } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    id:string,
    name:string,
    email:string,
    cpf:string,
    phone:string
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    id, name, email, cpf, phone,
  }: IRequest): Promise<Users> {
    const userExists = this.usersRepository.findById(id);

    if (!userExists) { throw new AppError('Não existe usuário com este id'); }

    const userAlreadyExists = await this.usersRepository.findByEmailPhoneOrCpf(email, phone, cpf);

    if (userAlreadyExists) throw new AppError('User with same name, phone or cpf already exists');

    const updatedUser = this.usersRepository.update(id, { name, email: email.toLowerCase(), phone });

    return updatedUser;
  }
}

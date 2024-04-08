import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User | undefined> {
    if (!(await this.usersRepository.existsBy({ id }))) {
        throw new NotFoundException(`No user with id : ${id} was found`);
      }
    return await this.usersRepository.findOneBy({ id });
  }
}

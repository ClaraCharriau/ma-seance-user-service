import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    if (!(await this.usersRepository.existsBy({ email }))) {
      throw new NotFoundException(`No user with email : ${email} was found`);
    }
    return await this.usersRepository.findOneBy({ email });
  }

  async existsByEmail(email: string): Promise<boolean> {
    return await this.usersRepository.existsBy({ email });
  }

  async createUser(email: string, pseudo: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    const newUser = {
      id: crypto.randomUUID(),
      pseudo,
      email,
      password: hashedPassword,
    };

    await this.usersRepository.save(newUser);
    return newUser;
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, this.saltRounds);
  }
}

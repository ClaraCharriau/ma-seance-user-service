import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    if (!(await this.usersRepository.existsBy({ email }))) {
      throw new NotFoundException(`No user with email : ${email} was found`);
    }
    return await this.usersRepository.findOneBy({ email });
  }

  async findUserById(id: string): Promise<User> {
    if (!(await this.usersRepository.existsBy({ id }))) {
      throw new NotFoundException(`No user with id : ${id} was found`);
    }
    return await this.usersRepository.findOneBy({ id });
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

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (!(await this.usersRepository.existsBy({ id }))) {
      throw new NotFoundException(`No user with id : ${id} was found`);
    }

    updateUserDto.password = await this.hashPassword(updateUserDto.password);
    
    await this.usersRepository.update(id, updateUserDto);
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}

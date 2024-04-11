import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<UserDto> {
    if (!(await this.usersRepository.existsBy({ email }))) {
      throw new NotFoundException(`No user with email : ${email} was found`);
    }
    const user = await this.usersRepository.findOneBy({ email });
    return UserDto.fromUser(user);
  }

  async findUserById(id: string): Promise<UserDto> {
    if (!(await this.usersRepository.existsBy({ id }))) {
      throw new NotFoundException(`No user with id : ${id} was found`);
    }
    const user = await this.usersRepository.findOneBy({ id });
    return UserDto.fromUser(user);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return await this.usersRepository.existsBy({ email });
  }

  async existsById(id: string): Promise<boolean> {
    return await this.usersRepository.existsBy({ id });
  }

  async createUser(
    email: string,
    pseudo: string,
    password: string,
  ): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(password);
    const newUser = {
      id: crypto.randomUUID(),
      pseudo,
      email,
      password: hashedPassword,
      watchlist: [],
      agenda: [],
      favoriteTheaters: [],
    };

    await this.usersRepository.save(newUser);
    return UserDto.fromUser(newUser);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    if (!(await this.usersRepository.existsBy({ id }))) {
      throw new NotFoundException(`No user with id : ${id} was found`);
    }

    updateUserDto.password = await this.hashPassword(updateUserDto.password);

    await this.usersRepository.update(id, updateUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    if (!(await this.usersRepository.existsBy({ id }))) {
      throw new NotFoundException(`No user with id : ${id} was found`);
    }
    await this.usersRepository.delete(id);
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from '../user/user.service';
import { TokenDto } from './dto/token.dto';
import { VerifyResponseDto } from './dto/verifyResponse.dto';
const bcrypt = require('bcrypt');

/**
 * AuthService
 * Service that retrieve a user and verify the password
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, pass: string): Promise<TokenDto> {
    // Find if user exists by email
    const user = await this.userService.findUserByEmail(email);

    // Check password
    if (await this.isPasswordValid(pass, user?.password)) {
      // Generate our JWT with user's informations
      const payload = { user };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }

  async signIn(email: string, pseudo: string, password: string): Promise<UserDto> {
    // Check if user exists by email before create
    const isExistingUser = await this.userService.existsByEmail(email);
    if (isExistingUser) {
      throw new BadRequestException(
        `User with email: ${email} already exists.`,
      );
    }

    return await this.userService.createUser(email, pseudo, password);
  }

  async verify(email: string): Promise<VerifyResponseDto> {
    if (!email) throw new BadRequestException();
    return { isExistingAccount: await this.userService.existsByEmail(email) };
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    await this.userService.updateUser(id, updateUserDto);

    return await this.userService.findUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }

  private async isPasswordValid(
    pass: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(pass, hashedPassword);
  }
}

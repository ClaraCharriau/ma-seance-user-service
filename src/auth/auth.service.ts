import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TokenDto } from './dto/token.dto';
import { VerifyResponseDto } from './dto/verifyResponse.dto';
import { User } from 'src/user/entities/user.entity';
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
    const user = await this.userService.findUserByEmail(email);

    if (await this.isPasswordValid(pass, user?.password)) {
      // Generate our JWT from user id and email
      const payload = { userId: user.id, email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new UnauthorizedException();
  }

  async signIn(email: string, pseudo: string, password: string): Promise<User> {
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

  private async isPasswordValid(
    pass: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(pass, hashedPassword);
  }
}

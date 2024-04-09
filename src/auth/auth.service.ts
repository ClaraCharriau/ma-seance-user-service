import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
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

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
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

  async isPasswordValid(
    pass: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(pass, hashedPassword);
  }
}

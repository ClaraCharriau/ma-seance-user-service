import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
const bcrypt = require('bcrypt');

/**
 * AuthService
 * Service that retrieve a user and verify the password
 */
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);

    if (!this.isPasswordValid(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  async isPasswordValid(pass: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(pass, hashedPassword);
  }
}

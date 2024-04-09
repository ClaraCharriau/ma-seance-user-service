import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signIn.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * /POST Registrations
   * will receive the username and password in the request body,
   * and will return a JWT token if the user is authenticated.
   * 
   * @param signInDto 
   * @returns 
   */
  @HttpCode(HttpStatus.OK)
  @Post('registrations')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { TokenDto } from './dto/token.dto';
import { EmailDto } from './dto/email.dto';
import { VerifyResponseDto } from './dto/verifyResponse.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * /POST Registrations
   * will receive the username and password in the request body,
   * and will return a JWT token if the user is authenticated.
   *
   * @param signInDto
   * @returns Promise<TokenDto> with JWT accessToken
   */
  @HttpCode(HttpStatus.OK)
  @Post('registrations')
  signIn(@Body() signInDto: SignInDto): Promise<TokenDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  /**
   * /POST verify
   * will receive an email in the request body,
   * and will return a boolean depending on the account existence.
   *
   * @param emailDto
   * @returns Promise<VerifyResponseDto> with boolean value
   */
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  verify(@Body() emailDto: EmailDto): Promise<VerifyResponseDto> {
    return this.authService.verify(emailDto.email);
  }
}

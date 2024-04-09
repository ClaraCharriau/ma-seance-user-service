import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { TokenDto } from './dto/token.dto';
import { EmailDto } from './dto/email.dto';
import { VerifyResponseDto } from './dto/verifyResponse.dto';
import { User } from 'src/user/entities/user.entity';
import { LogInDto } from './dto/logIn.dto';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /login
   * will receive the username and password in the request body,
   * and will return a JWT token if the user is authenticated.
   *
   * @param logInDto
   * @returns Promise<TokenDto> with JWT accessToken
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() logInDto: LogInDto): Promise<TokenDto> {
    return this.authService.logIn(logInDto.email, logInDto.password);
  }

  /**
   * POST /registrations
   * will receive the username, email and password in the request body,
   * and will return the authenticated user.
   *
   * @param signInDto
   * @returns Promise<User>
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('registrations')
  signIn(@Body() signInDto: SignInDto): Promise<User> {
    return this.authService.signIn(
      signInDto.email,
      signInDto.pseudo,
      signInDto.password,
    );
  }

  /**
   * POST /registrations/{id}
   * will receive a id in param and a updateUserDto in the request body,
   * and will return the successfully updated user.
   *
   * @param id
   * @param updateUserDto
   * @returns Promise<User>
   */
  @HttpCode(HttpStatus.CREATED)
  @Patch('registrations/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.authService.updateUser(id, updateUserDto);
  }

  /**
   * POST /verify
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

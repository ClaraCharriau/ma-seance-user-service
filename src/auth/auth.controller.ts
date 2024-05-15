import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { EmailDto } from './dto/email.dto';
import { LogInDto } from './dto/logIn.dto';
import { SignInDto } from './dto/signIn.dto';
import { TokenDto } from './dto/token.dto';
import { VerifyResponseDto } from './dto/verifyResponse.dto';
import { AuthGuard } from '../guard/auth.gard';

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
   * @returns Promise<UserDto>
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('registrations')
  signIn(@Body() signInDto: SignInDto): Promise<UserDto> {
    return this.authService.signIn(
      signInDto.email,
      signInDto.pseudo,
      signInDto.password,
    );
  }

  /**
   * PATCH /registrations/{id}
   * will receive an id in param and a updateUserDto in the request body,
   * and will return the successfully updated user.
   *
   * @param userId
   * @param updateUserDto
   * @returns Promise<UserDto>
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('registrations/:userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.authService.updateUser(userId, updateUserDto);
  }

  /**
   * DELETE /registrations/{id}
   * will receive an id in param,
   * and will delete user account.
   *
   * @param userId
   * @returns Promise<void>
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('registrations/:userId')
  deleteUser(@Param('userId') userId: string): Promise<void> {
    return this.authService.deleteUser(userId);
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

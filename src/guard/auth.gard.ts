import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

/**
 * Authentication guard (middleware)
 * will protect endpoints by requiring a valid JWT to be present on the request
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // Verify if the token exists and extract it
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verify the token with the secret key
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_CONSTANT,
      });
      // Assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;

      if (!this.verifyUserIdAreEquals(request, payload.userId)) {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private verifyUserIdAreEquals(
    request: Request,
    userIdFromToken: string,
  ): boolean {
    return request.params.id === userIdFromToken;
  }
}

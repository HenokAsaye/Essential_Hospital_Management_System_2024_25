import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
  console.log('Cookies in Middleware:', req.cookies);
  console.log('Token in Middleware:', req.cookies?.accessToken);

  const token = req.cookies?.accessToken;
  if (!token) {
    throw new UnauthorizedException('Invalid or expired Authentication token');
  }

  try {
    const payload = this.jwtService.verify(token);
    console.log('Payload:', payload);
    req.user = payload;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    throw new UnauthorizedException('Invalid or expired Authentication token');
  }
}
}
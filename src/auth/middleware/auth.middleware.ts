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
    const token = req.cookies?.accessToken;

    if (!token) {
      console.error('No access token found in cookies');
      throw new UnauthorizedException('Authentication token is missing');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,  
      });

      console.log('Decoded Payload:', payload); // Debugging
      req.user = payload; 
      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      throw new UnauthorizedException('Invalid or expired Authentication token');
    }
  }
}

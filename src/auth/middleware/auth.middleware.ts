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
      throw new UnauthorizedException('Invalid or expired Authentication token');
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,  
      });

      req.user = payload; 
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired Authentication token');
    }
  }
}


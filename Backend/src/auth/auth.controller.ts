import { Body, Controller, Post, Res, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    try {
      const result = await this.authService.registerPatient(signupDto, res);
      return res.status(HttpStatus.CREATED).json({
        message: 'Signup successful',
        data: result, 
      });
    } catch (error) {
      console.error('Error during signup:', error.message);
      
      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: error.message,
          error: 'Unauthorized',
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during signup',
      });
    }
  }

  @Post('signupdoctor')
  async signupDoctor(@Body() signupDto: SignupDto, @Res() res: Response) {
    try {
      const result = await this.authService.registerDoctor(signupDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Doctor signup successful',
        data: result,
      });
    } catch (error) {
      console.error('Error during signupDoctor:', error.message);

      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: error.message,
          error: 'Unauthorized',
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during doctor signup',
      });
    }
  }


  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.login(loginDto, res);
      return res.status(HttpStatus.OK).json({
        message: 'Login successful',
        data: result, 
      });
    } catch (error) {
      console.error('Error during login:', error.message);

      if (error instanceof UnauthorizedException) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: error.message,
          error: 'Unauthorized',
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during login',
      });
    }
  }

  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    try {
      res.clearCookie('accessToken', { httpOnly: true, secure: true });
      return res.status(HttpStatus.OK).json({
        message: 'Logged out successfully',
      });
    } catch (error) {
      console.error('Error during logout:', error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during logout',
      });
    }
  }

  @Post('firstadmin')
  async FirstAdmin(@Body() adminDto: AdminDto, @Res() res: Response) {
    try {
      const result = await this.authService.firstAdmin(adminDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Welcome! You are the First Admin',
        data: result, 
      });
    } catch (error) {
      console.error('Error during firstAdmin signup:', error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during firstAdmin signup',
      });
    }
  }

  @Post('loginadmin')
  async LoginAdmin(@Body() adminDto: AdminDto, @Res() res: Response) {
    try {
      const result = await this.authService.logInAdmin(adminDto, res);
      return res.status(HttpStatus.OK).json({
        message: 'Welcome Back, Admin',
        data: result, 
      });
    } catch (error) {
      console.error('Error during Admin login:', error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during Admin login',
      });
    }
  }
}

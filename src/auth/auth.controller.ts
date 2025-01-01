import { Controller, Post, Body, Res } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    // console.log('Received signup request:', signupDto);
    try {
      const result = await this.authService.registerPatient(signupDto);
      // console.log('Signup response:', result);
      return result;
    } catch (error) {
      // console.error('Error during signup:', error.message);
      throw new InternalServerErrorException('An error occurred during signup');
    }
  }

  @Post('signupdoctor')
  async signupDoctor(@Body() signUpDto: SignupDto) {
    // console.log('Received signupDoctor request:', signUpDto);
    try {
      const result = await this.authService.registerDoctor(signUpDto);
      // console.log('SignupDoctor response:', result);
      return result;
    } catch (error) {
      // console.error('Error during signupDoctor:', error.message);
      throw new InternalServerErrorException('An error occurred during signupDoctor');
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    // console.log('Received login request:', loginDto);
    try {
      const result = await this.authService.login(loginDto, res);
      // console.log('Login response:', result);
      return result;
    } catch (error) {
      // console.error('Error during login:', error.message);
      throw new InternalServerErrorException('An error occurred during login');
    }
  }

  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    // console.log('Received logout request');
    try {
      res.clearCookie('accesstoken', { httpOnly: true, secure: true });
      const response = { message: 'Logged out Successfully' };
      // console.log('Logout response:', response);
      return res.status(200).json(response);
    } catch (error) {
      // console.error('Error during logout:', error.message);
      throw new InternalServerErrorException('An error occurred during logout');
    }
  }
}



import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AdminDto } from './dto/admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registerPatient(signupDto: SignupDto, res: Response) {
    try {
      const userExists = await this.prisma.user.findUnique({ where: { email: signupDto.email } });
      if (userExists) {
        throw new UnauthorizedException('User already exists');
      }
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          name: signupDto.name,
          email: signupDto.email,
          password: hashedPassword,
          role: 'Patient',
          age: signupDto.age,
          gender: signupDto.gender,
          contact: signupDto.contact,
        },
      });
      await this.prisma.patient.create({
        data: {
          userId: user.id,
        },
      });
      const token = await this.jwtService.signAsync({ userId: user.id, email: user.email });
      res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 3600000, 
      });
      return { message: 'Patient registered successfully' };
    } catch (error) {
      console.error('Error in registerPatient:', error);
      if (error instanceof UnauthorizedException) {
        throw error; 
      }
      throw new InternalServerErrorException('An error occurred while registering the patient.');
    }
  }

  async registerDoctor(signupDto: SignupDto) {
    try {
      const userExists = await this.prisma.user.findUnique({ where: { email: signupDto.email } });
      if (userExists) {
        throw new UnauthorizedException('User already exists');
      }
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
      const user = await this.prisma.user.create({
        data: {
          name: signupDto.name,
          email: signupDto.email,
          password: hashedPassword,
          role: 'Doctor',
        },
      });
      await this.prisma.doctorRequest.create({
        data: {
          userId: user.id,
          status: 'PENDING',
        },
      });
      const payload = { sub: user.id, role: user.role };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      });
      return {
        message: 'Doctor signup request submitted. Awaiting admin approval.',
        accessToken,
      };
    } catch (error) {
      console.error('Error in registerDoctor:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred while registering the doctor.');
    }
  }

  async login(loginDto: LoginDto, res: Response) {
    try {
      const { email, password } = loginDto;
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new UnauthorizedException('Invalid email or password.');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password.');
      }
      const payload = { sub: user.id, role: user.role };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
      return { message: 'Login Successful' };
    } catch (error) {
      console.error('Error caught in login:', error);
      if (error instanceof UnauthorizedException) {
        throw error; 
      }
      throw new InternalServerErrorException('An error occurred while logging in.');
    }
  }

  async firstAdmin(adminDto: AdminDto) {
    try {
      const { email, name } = adminDto;
      const adminEmail = process.env.ADMIN_EMAIL;
      if (email !== adminEmail) {
        throw new UnauthorizedException('Invalid email or password.');
      }
      const AdminPassword = process.env.ADMIN_PASSWORD;
      const hashedAdminPassword = await bcrypt.hash(AdminPassword, 10);
      const user = await this.prisma.user.create({
        data: {
          name,
          email: adminEmail,
          password: hashedAdminPassword,
          role: 'Admin',
        },
      });
      await this.prisma.admin.create({
        data: {
          userId: user.id,
        },
      });
      const payload = { sub: user.id, role: user.role };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      return { message: 'Admin created and login successful', accessToken };
    } catch (error) {
      console.error('Error in firstAdmin:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred while creating the admin.');
    }
  }

  async logInAdmin(adminDto: AdminDto, res: Response) {
    try {
      const { email, password } = adminDto;
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new UnauthorizedException('You are not an admin, please don’t try again. It has consequences!');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password, please try again.');
      }
      const payload = { sub: user.id, role: user.role };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
      return { message: 'Logged in as Admin successfully' };
    } catch (error) {
      console.error('Error caught in logInAdmin:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Server error occurred while logging in as admin.');
    }
  }
}

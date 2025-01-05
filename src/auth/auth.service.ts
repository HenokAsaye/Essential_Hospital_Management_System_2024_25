import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AdminDto} from './dto/admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async registerPatient(signupDto: SignupDto) {
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
      return { message: 'Patient registered successfully' };
    } catch (error) {
      console.error('Error in registerPatient:', error);
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
      console.log(process.env.JWT_SECRET)

      console.log('JWT_SECRET:', process.env.JWT_SECRET); 
      console.log('Generated Access Token:', accessToken); 

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });

      return {
        message: 'Login Successful',
      };
    } catch (error) {
      console.error('Error caught in login:', error);
      console.error('Error name:', error.name);
      console.error('Error instanceof UnauthorizedException:', error instanceof UnauthorizedException);
    
      if (error instanceof UnauthorizedException) {
        throw error; 
      }
      throw new InternalServerErrorException('An error occurred while logging in.');
    }
  }
  async firstAdmin(admindto:AdminDto){
    try {
      const {email,name} = admindto;
      const adminEmail = process.env.ADMIN_EMAIL;
      if(email !== adminEmail){
        throw new UnauthorizedException('Invalid email or password.');
      }
      const AdminPassword = process.env.ADMIN_PASSWORD;
      const hashedAdminPassword= await bcrypt.hash(AdminPassword,10)
      const user = await this.prisma.user.create({
        data: {
          name,
          email: adminEmail,
          password: hashedAdminPassword,
          role: 'Admin',
        },
      });
      const admin = await this.prisma.admin.create({
        data: {
          userId: user.id,
        },
      })
      const payload = { sub: user.id, role: user.role };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      return {
        message: 'Login Successful',
      };
    } catch (error) {
      console.error('Error caught in login:', error);
      console.error('Error name:', error.name);
      console.error('Error instanceof UnauthorizedException:', error instanceof UnauthorizedException);
      if (error instanceof UnauthorizedException) {
        throw error; 
      }
      throw new InternalServerErrorException('An error occurred while logging in.');
    }
  }
  async logInAdmin(AdminDto:AdminDto,res:Response){
    try {
      const {email,password} = AdminDto
      const user = await this.prisma.user.findUnique({
        where:{email}
      })
      if(!user){
        throw new  UnauthorizedException("You Are not Admin, Please Don't Try it Again.It has a Consequence!")
      }
      const isvalidPassword = await bcrypt.compare(password,user.password)
      if(!isvalidPassword){
        throw new UnauthorizedException("Invalid Password,Please Try Again")
      }
      const payload = {sub:user.id,role:user.role}
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      });
      return "Logged in As Admin SuccessFully"
    } catch (error) {
      throw new InternalServerErrorException("Server Error Exception!")
    }
 }
}
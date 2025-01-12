import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule} from 'Backend/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],

})
export class AdminModule {}

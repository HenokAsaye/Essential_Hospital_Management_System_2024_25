import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
<<<<<<< HEAD
import { PrismaModule} from 'Backend/prisma/prisma.module';
=======
import { PrismaModule} from '../../prisma/prisma.module';
>>>>>>> route

@Module({
  imports: [PrismaModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],

})
export class AdminModule {}

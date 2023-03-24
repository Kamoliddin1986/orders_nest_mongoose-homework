import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),JwtModule.register({})],
  controllers: [AdminController],
  providers: [AdminService],
  // exports: [JwtModule]
})
export class AdminModule {}

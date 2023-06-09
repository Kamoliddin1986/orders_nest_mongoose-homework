import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { Operation, OperationSchema } from './schemas/operation.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Operation.name, schema: OperationSchema}])],
  controllers: [OperationController],
  providers: [OperationService]
})
export class OperationModule {}

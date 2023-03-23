import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation, OperationDocument } from './schemas/operation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OperationService {

  constructor(@InjectModel(Operation.name) private operationModel: Model<OperationDocument>){}

  create(createOperationDto: CreateOperationDto) {
    return new this.operationModel(createOperationDto).save()
  }

  async  findAll() {
    const operations =  await this.operationModel.find().populate(['order_id','status_id','admin_id'])
    return operations
  }

  findOne(id: string) {
    return this.operationModel.findById(id).exec()
  }

  update(id: string, updateOperationDto: UpdateOperationDto) {
    return this.operationModel.findByIdAndUpdate(id, updateOperationDto, {new: true}).exec()
  }

  remove(id: string) {
    return this.operationModel.findByIdAndDelete(id)
  }
}

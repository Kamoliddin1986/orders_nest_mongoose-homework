import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Status, StatusDocument } from './schemas/status.schema';
import { Model } from 'mongoose';

@Injectable()
export class StatusService {
  
  constructor(@InjectModel(Status.name) private statusModel: Model<StatusDocument>) {}


  create(createStatusDto: CreateStatusDto) {
    return new this.statusModel(createStatusDto).save()
  }

  async findAll(): Promise<Status[]> {
    const status =  await this.statusModel.find()
    return status
  }

  findOne(id: string) {
    return this.statusModel.findById(id).exec()
  }

  update(id: string, updateStatusDto: UpdateStatusDto) {
    return this.statusModel.findByIdAndUpdate(id, updateStatusDto, {new: true}).exec()
  
  }

  remove(id: string) {
    return this.statusModel.findByIdAndDelete(id)
  }
}

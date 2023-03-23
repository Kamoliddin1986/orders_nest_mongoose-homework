import { Injectable } from '@nestjs/common';
import { CreateCurrencyTypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrencyTypeDto } from './dto/update-currency_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CurrencyType, CurrencyTypeDocument } from './schemas/currency_type.schema';

@Injectable()
export class CurrencyTypeService {

  constructor(@InjectModel(CurrencyType.name) private currencyTypeModel: Model<CurrencyTypeDocument>) {}

  create(createCurrencyTypeDto: CreateCurrencyTypeDto) {
    const add = new this.currencyTypeModel(createCurrencyTypeDto)
  return add.save()
  
  }

  async findAll() {
    const operations =  await this.currencyTypeModel.find()
    return operations
  }

  findOne(id: string) {
    return this.currencyTypeModel.findById(id).exec()
  }

  update(id: string, updateCurrencyTypeDto: UpdateCurrencyTypeDto) {
    return this.currencyTypeModel.findByIdAndUpdate(id, updateCurrencyTypeDto, {new: true}).exec()
  }

  remove(id: string) {
    return this.currencyTypeModel.findByIdAndDelete(id)
  }
}

import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {

  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

 async create(createOrderDto: CreateOrderDto) {
    const createOrder = await new this.orderModel(createOrderDto).save()
    const nwid = createOrder._id.toString()
    const updateOrder = await this.orderModel.findByIdAndUpdate(nwid, {order_unique_id: nwid}, {new:true}).populate('currency_type_id')
    console.log(updateOrder);
    
    return updateOrder
  }

  async findAll() {
    const orders =  await this.orderModel.find()
    return orders
  }

  findOne(id: string) {
    return this.orderModel.findById(id).exec()
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, {new: true}).exec()
  
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id)
  }
}

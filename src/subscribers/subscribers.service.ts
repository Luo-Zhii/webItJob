import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { IUser } from '@/users/user.interface';
import aqp from 'api-query-params';

@Injectable()
export class SubscribersService {

  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
  ) { }
  async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
    const subscriber = await this.subscriberModel.create({
      ...createSubscriberDto,
      createdBy: {
        _id: user._id,
        name: user.name
      }
    })
    return subscriber;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population} = aqp(qs)
    delete filter.current
    delete filter.pageSize
    
    // similar index in sql 
    let offset = (+currentPage - 1) * (+limit)

    // amount of item you want show in this page
    let defaultLimit = +limit ? +limit : 10

    const totalItems = (await this.subscriberModel.find(filter)).length 
    // calculate total pages
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.subscriberModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    // @ts-ignore
    .sort(sort)
    .populate(population)
    .exec()

    return {
      meta: {
        current: currentPage, // current page 
        pageSize: limit, // number of record you retrive from db 
        pages: totalPages, // all of number page with query condition
        total: totalItems,// all of item (number record)
      },
      result // result query 
    }
  }

    async findOne(id: string) {
      if (!mongoose.Types.ObjectId.isValid(id)) return 'not found subscriber';

      return this.subscriberModel.findById(id);
    }
    async find() {
      return this.subscriberModel.find();
    }

  async update(id: string, updateSubscriberDto: UpdateSubscriberDto, user: IUser) {
    return await this.subscriberModel.updateOne(
      { _id: id },
      { 
        ...updateSubscriberDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      })
  }

  async removeById(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found subscriber';
    await this.subscriberModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        }
      })
    return this.subscriberModel.softDelete({
      _id: id,
    },
  
  );
  }
}


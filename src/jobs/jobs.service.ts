import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from './schemas/job.schemas';
import { Injectable } from '@nestjs/common';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from '@/users/user.interface';
import aqp from 'api-query-params';
import mongoose from 'mongoose';

@Injectable()
export class JobsService {
  constructor(
      @InjectModel(Job.name)
      private jobModel: SoftDeleteModel<JobDocument>
    ) {}

  async create(createJobDto: CreateJobDto, user: IUser) {
    const {
        name,
        skills,
        salary,
        quantity,
        level,
        description,
        startDate,
        endDate,
        company, 
        isActive,
        location,
    } = createJobDto
    let newJob = await this.jobModel.create(
      {
        name,
        skills,
        salary,
        quantity,
        level,
        description,
        startDate,
        endDate,
        company, 
        isActive,
        location,
        createdBy: {
          _id: user._id,
          name: user.name
        }
      });
      const {_id, createdAt} = newJob
      return {
        _id,
        createdAt
      }
  }

  async findAll(current: number, limit: number, qs: string) {
    const {filter, sort, population} = aqp(qs)
    delete filter.current,
    delete filter.pageSize

    let offset = (+current - 1) *  (+limit)

    let defaultLimit = +limit ? +limit: 10 

    const totalItems = (await this.jobModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.jobModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    // @ts-ignore
    .sort(sort)
    .populate(population)
    .exec()
    return {
      meta: {
        current: current,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result
    };
  }

  async findOne(id: string) {
    if(!mongoose.Types.ObjectId) return 'not found jobs';

    return this.jobModel.findOne({
      _id: id,
    })
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    return await this.jobModel.updateOne({
      _id: id
    }, 
    {
      ...updateJobDto,
      updatedBy: {
        _id: user._id,
        name: user.name
      }
    });
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found jobs';
    await this.jobModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          name: user.name,
        }
      }
  )
    return this.jobModel.softDelete({
      _id: id
    });
  }
}

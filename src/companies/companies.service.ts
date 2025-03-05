import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IUser } from '@/users/user.interface';
import aqp from 'api-query-params';

@Injectable()
export class CompaniesService {

  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) { }
  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const company = await this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        name: user.name
      }
    })
    return company;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population} = aqp(qs)
    delete filter.page
    delete filter.limit 
    
    // similar index in sql 
    let offset = (+currentPage - 1) * (+limit)

    // amount of item you want show in this page
    let defaultLimit = +limit ? +limit : 10

    const totalItems = (await this.companyModel.find(filter)).length 
    // calculate total pages
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.companyModel.find(filter)
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
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found company';

    return this.companyModel.findOne({
      _id: id
    });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    return await this.companyModel.updateOne(
      { _id: id },
      {
        ...updateCompanyDto,
        updatedBy: {
          _id: user._id,
          email: user.email
        }
      })
  }

  async removeById(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found company';
    await this.companyModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        }
      })
    return this.companyModel.softDelete({
      _id: id,
    },
  
  );
  }
}

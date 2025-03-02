import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class CompaniesService {
  
  constructor(
    @InjectModel(Company.name)
    private companyModel : SoftDeleteModel<CompanyDocument>,
  ){}
  async create(createCompanyDto: CreateCompanyDto) {
    const company = await this.companyModel.create({
      name: createCompanyDto.name,
      address: createCompanyDto.address,
      description: createCompanyDto.description,
    })
    return company;
  }

  async findAll() {
    return await this.companyModel.find({}) ;
  }

  async findOne(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return 'not found company';

    return this.companyModel.findOne({
      _id:id
    });
  }

  async update( updateCompanyDto: UpdateCompanyDto) {
    return await this.companyModel.updateOne({ _id: updateCompanyDto._id}, {...updateCompanyDto})
  }

  removeById(id: string): any {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found company';

    return this.companyModel.softDelete({
      _id: id,
    });
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Version } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { User } from '../auth/decorator/pass_user';
import { IUser } from '../users/user.interface';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Public } from '../auth/decorator/jwt_public';
import { ResponseMessage } from '@/auth/decorator/message';


@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.companiesService.findAll(+currentPage, +limit, qs);
  }
  

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }
  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @User() user: IUser
  ) {
    return this.companiesService.create(createCompanyDto, user);
  }
  
  @Patch(':id')
  update(
        @Param('id') id: string, 
        @Body() updateCompanyDto: UpdateCompanyDto,
        @User() user: IUser
      ) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  deleteCompany(
    @Param('id') id: string,
    @User() user: IUser
  ): any  {
    return this.companiesService.removeById(id, user);
  }
}

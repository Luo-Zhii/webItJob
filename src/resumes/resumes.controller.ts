import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { User } from '@/auth/decorator/pass_user';
import { ResponseMessage } from '@/auth/decorator/message';
import { Public } from '@/auth/decorator/jwt_public';
import { IUser } from '@/users/user.interface';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post('by-user')
  @ResponseMessage("Get resume by user")
  getResumeByUser(@User() user: IUser) {
    return this.resumesService.findByUser(user);
  }

  @Post()
  @ResponseMessage('add new resume data successfully')
  create(@Body() createUserCvDto: CreateUserCvDto, @User() user) {
    return this.resumesService.create(createUserCvDto, user);
  }


  @Public()
  @ResponseMessage('fetched resume data successfully')
  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.resumesService.findAll(+currentPage, +limit, qs);
  }



  @Public()
  @ResponseMessage('fetched resume data successfully')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string,@Body("status") status: string,  @User() user) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.resumesService.removeById(id, user);
  }
}

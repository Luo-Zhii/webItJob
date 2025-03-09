import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { User } from '@/auth/decorator/pass_user';
import { Public } from '@/auth/decorator/jwt_public';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto, @User() user) {
    return this.jobsService.create(createJobDto, user);
  }

  @Public()
  @Get()
  findAll(
    @Query() current: string, 
    @Query() pageSize: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(+current, +pageSize, qs);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.jobsService.remove(id, user);
  }
}

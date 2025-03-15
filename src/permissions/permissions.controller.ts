import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { User } from '@/auth/decorator/pass_user';
import { Public } from '@/auth/decorator/jwt_public';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto, @User() user) {
    return this.permissionsService.create(createPermissionDto, user);
  }

  @Public()
  @Get()
  findAll(
    @Query("current") current: string, 
    @Query("pageSize") pageSize: string,
    @Query() qs: string,
  ) {
    return this.permissionsService.findAll(+current, +pageSize, qs);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto, @User() user) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user) {
    return this.permissionsService.remove(id, user);
  }
}

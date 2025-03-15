import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User } from '@/auth/decorator/pass_user';
import { Public } from '@/auth/decorator/jwt_public';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
    @Post()
    create(@Body() createRoleDto: CreateRoleDto, @User() user) {
      return this.rolesService.create(createRoleDto, user);
    }
  
    @Public()
    @Get()
    findAll(
      @Query('current') current: string, 
      @Query('pageSize') pageSize: string,
      @Query() qs: string,
    ) {
      return this.rolesService.findAll(+current, +pageSize, qs);
    }
  
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.rolesService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @User() user) {
      return this.rolesService.update(id, updateRoleDto, user);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string, @User() user) {
      return this.rolesService.remove(id, user);
    }
  }

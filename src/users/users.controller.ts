import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/decorator/jwt_public';
import { ResponseMessage } from '../auth/decorator/message';
import { User } from '../auth/decorator/pass_user';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @ResponseMessage('fetched user data succesfully')
  @Get()
  findAll(
    @Query("page") currentPage: string,
    @Query("limit") limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }


  @Post()
  @ResponseMessage('fetched user data successfully')
  async create(
    @Body() createUserDto: CreateUserDto,
    @User() user
  ) {
    let newUser: any = await this.usersService.create(createUserDto, user);
    if (newUser) {
      return {
        _id: newUser._id,
        createdAt: newUser.createdAt
      };
    }
  }

  @Patch()
  @ResponseMessage('update info user data successfully')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @User() user,
  ) {
    return this.usersService.update(updateUserDto, user);
  }

  @Delete(':id')
  @ResponseMessage('delete user successfully')
  deleteUser(@Param('id') id: string, @User() user,): any {
    return this.usersService.removeById(id, user)
  }
}

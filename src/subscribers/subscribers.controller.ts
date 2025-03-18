import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Public } from '@/auth/decorator/jwt_public';
import { IUser } from '@/users/user.interface';
import { User } from '@/auth/decorator/pass_user';
import { SkipCheckPermission } from '@/auth/decorator/permissions_public';
import { ResponseMessage } from '@/auth/decorator/message';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Public()
  @Get()
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.subscribersService.findAll(+currentPage, +limit, qs);
  }
  

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }
  @Post()
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @User() user: IUser
  ) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Post("skills")
  @SkipCheckPermission()
  @ResponseMessage("Get subscibler skills")
  getUserSkills(@User() user: IUser) {
    return this.subscribersService.getSkills(user)
  }

  
  @Patch()
  @SkipCheckPermission()
  @ResponseMessage('Update a subscribler')
  update(
        @Body() updateSubscriberDto: UpdateSubscriberDto,
        @User() user: IUser
      ) {
    return this.subscribersService.update(updateSubscriberDto, user);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @User() user: IUser
  ): any  {
    return this.subscribersService.removeById(id, user);
  }
}

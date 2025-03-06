import { Controller, Get, Post,  UseGuards, Req, Body, Res } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './local-auth.guard';

import { Public } from './decorator/jwt_public';
import {  RegisterUserDto } from '../users/dto/create-user.dto';
import { ResponseMessage } from './decorator/message';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
      private readonly authService: AuthService,
  ) { }

  //If you want skip jwt guard, use @Public()
  @Public()
  @ResponseMessage('User Login')
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res({ passthrough: true }) response, @Req() req){
    return this.authService.login(req.user, response);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user
  }

  @Public()
  @ResponseMessage('register a new user successfully')
  @Post('/register')
  async register( @Body() registerUserDto : RegisterUserDto) {
    return this.authService.register(registerUserDto)
  }
}

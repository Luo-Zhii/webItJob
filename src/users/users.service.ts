import { Injectable, OnModuleInit } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import bcrypt from 'bcryptjs';
import { IUser } from './user.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
    private configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto, user: IUser) {
    const hashPassword = await this.hashPassword(createUserDto.password);

    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
      createdBy: {
        _id: user._id,
        name: user.name
      }
    });

    return newUser
  }

  async register(registerModule: RegisterUserDto) {
    const { name, email, password, age, gender, address } = registerModule;
    const hashPassword = await this.hashPassword(password);

    const newRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: "USER",
    });

    return newRegister;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async isValidPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compareSync(plainPassword, hashedPassword);
    return isMatch;
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population} = aqp(qs)
    delete filter.page
    delete filter.limit 
    
    // similar index in sql 
    let offset = (+currentPage - 1) * (+limit)

    // amount of item you want show in this page
    let defaultLimit = +limit ? +limit : 10

    const totalItems = (await this.userModel.find(filter)).length 
    // calculate total pages
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.userModel.find(filter)
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
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found user';

    return this.userModel.findOne({
      _id: id,
    }).select('-password');
  } 

  async update(updateUserDto: UpdateUserDto, user: IUser) {


    return this.userModel.updateOne( { _id: updateUserDto._id }, { 
      name: updateUserDto.name,
      age: updateUserDto.age,
      gender: updateUserDto.gender,
      address: updateUserDto.address,
      updatedBy: {
        _id: user._id,
        name: user.name,
      },
     } )
  }

  async removeById(id: string, user: IUser) {
    await this.userModel.updateOne(
      { _id: id },
      {deletedBy: {
        _id: user._id,
        name: user.name,
      }}
    )
    
    // soft delete
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found user';

    return this.userModel.softDelete({
      _id: id,
    },
  );
  }
}

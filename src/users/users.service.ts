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
import { Role, RoleDocument } from '@/roles/schemas/role.schema';
import { USER_ROLE } from '@/databases/const';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
    
    private configService: ConfigService,
  ) { }

  hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
  }

  async create(createUserDto: CreateUserDto, user: IUser) {
    const hashPassword = this.hashPassword(createUserDto.password);

    let newUser = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      age: createUserDto.age,
      gender: createUserDto.gender,
      address: createUserDto.address,
      company: createUserDto.company,
      role: "USER",
      createdBy: {
        _id: user._id,
        name: user.name
      }
    });

    return newUser
  }
  isValidPassword(plainPassword: string, hashedPassword: string) {
    const isValid = bcrypt.compareSync(plainPassword, hashedPassword);
    return isValid;
  }

  async register(registerModule: RegisterUserDto) {
    const { name, email, password, age, gender, address } = registerModule;
    const hashPassword = this.hashPassword(password);
    const userRole = await this.roleModel.findOne({name: USER_ROLE})
    const newRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: userRole?._id,
    });

    return newRegister;
  }

  async findOneByEmail(username: string) {
    const user = await this.userModel.findOne({ email: username })
      .populate({ path: "role", select: { name: 1  } })
    return user;
  }


  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population } = aqp(qs)
    delete filter.current
    delete filter.pageSize

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
    })
      .select('-password')
      .populate({ path: "role", select: { name: 1} })
      ;
  }

  async update(updateUserDto: UpdateUserDto, user: IUser) {


    return this.userModel.updateOne({ _id: updateUserDto._id }, {
      name: updateUserDto.name,
      email: updateUserDto.email,
      age: updateUserDto.age,
      gender: updateUserDto.gender,
      address: updateUserDto.address,
      updatedBy: {
        _id: user._id,
        name: user.name,
      },
    })
  }

  async removeById(id: string, user: IUser) {
    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          name: user.name,
        }
      }
    )

    // soft delete
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found user';

    return this.userModel.softDelete({
      _id: id,
    },
    );
  }

  async updateRefreshToken(_id: string, refreshToken: string) {
    return await this.userModel.updateOne(
      { _id },
      { refreshToken },
    )
  }

  async findUserByRefreshToken(refreshToken: string) {
    return await this.userModel.findOne({ refreshToken })
    .populate({
      path: "role",
      select: {name: 1}
    });
  }
}

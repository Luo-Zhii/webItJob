import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IUser } from '@/users/user.interface';
import mongoose from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesService {

  constructor(
    @InjectModel(Role.name)
    private roleModel: SoftDeleteModel<RoleDocument>,
        private configService: ConfigService
  ) { }
  async create(createRoleDto: CreateRoleDto, user: IUser) {

    const {
      name,
      description,
      isActive,
      permissions,
    } = createRoleDto

    let newrole = await this.roleModel.create(
      {
        name,
        description,
        isActive,
        permissions,
        createdBy: {
          _id: user._id,
          name: user.name,
        }
      }
    )
    const { _id, createdAt } = newrole
    return {
      _id,
      createdAt,
    }
  }

  async findAll(current: number, limit: number, qs: string) {
    const { filter, sort, population, projection } = aqp(qs)
    delete filter.current,
      delete filter.pageSize

    let offset = (+current - 1) * (+limit)

    let defaultLimit = +limit ? +limit : 10

    const totalItems = (await this.roleModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.roleModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      // @ts-ignore
      .sort(sort)
      .populate(population)
      .exec()
    return {
      meta: {
        current: current,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result
    };
  }

  async findOne(id: string) {
    
    return this.roleModel.findOne({
      _id: id,
    }).populate({path: "permissions", select: {_id:1, apiPath: 1, name:1, method: 1, module: 1}})
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    return await this.roleModel.updateOne({
      _id: id
    },
      {
        ...updateRoleDto,
        updatedBy: {
          _id: user._id,
          name: user.name
        }
      });
  }

  async remove(id: string, user: IUser) {
    const foundUser = await this.roleModel.findOne({ _id: id });

    if (foundUser.name === this.configService.get<string>('ADMIN_ROLE')) {
      throw new Error('Invalid user');
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found jobs';
    await this.roleModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          name: user.name,
        }
      }
    )
    return this.roleModel.softDelete({
      _id: id
    });
  }
}

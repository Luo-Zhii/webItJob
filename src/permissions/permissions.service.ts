import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IUser } from '@/users/user.interface';
import mongoose from 'mongoose';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectModel(Permission.name)
        private permissionModel: SoftDeleteModel<PermissionDocument>
      ) {}
  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    
    const {
      name,
      apiPath,
      method,
      module,
    } = createPermissionDto
    const isExists = await this.permissionModel.findOne({ apiPath, method })
    if (isExists) {
      throw new BadRequestException("Exists in dbs")
    }
    
    let newPermission = await this.permissionModel.create(
      {
      name,
      apiPath,
      method,
      module,
      createdBy: {
        _id: user._id,
        name: user.name,
      }
      }
    )
    const {_id, createdAt} = newPermission
      return {
        _id,
        createdAt,
      }
  }

  
  async findAll(current: number, limit: number, qs: string) {
    const {filter, sort, population} = aqp(qs)
    delete filter.current,
    delete filter.pageSize

    let offset = (+current - 1) *  (+limit)

    let defaultLimit = +limit ? +limit: 10 

    const totalItems = (await this.permissionModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.permissionModel.find(filter)
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
    if(!mongoose.Types.ObjectId) return 'not found jobs';

    return this.permissionModel.findOne({
      _id: id,
    })
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
    return await this.permissionModel.updateOne({
      _id: id
    }, 
    {
      ...updatePermissionDto,
      updatedBy: {
        _id: user._id,
        name: user.name
      }
    });
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found jobs';
    await this.permissionModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          name: user.name,
        }
      }
  )
    return this.permissionModel.softDelete({
      _id: id
    });
  }
}

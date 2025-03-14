import { Permission, PermissionDocument } from '@/permissions/schemas/permission.schema';
import { Role, RoleDocument } from '@/roles/schemas/role.schema';
import { User, UserDocument } from '@/users/schemas/user.schema';
import { UsersService } from '@/users/users.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Logger } from '@nestjs/common';
import { ADMIN_ROLE, INIT_PERMISSION, USER_ROLE } from './const';

@Injectable()
export class DatabasesService implements OnModuleInit {
  private logger = new Logger(DatabasesService.name)
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: SoftDeleteModel<PermissionDocument>,
    @InjectModel(Role.name)
    private rolesModel: SoftDeleteModel<RoleDocument>,
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>,

    private configService: ConfigService,
    private userService: UsersService,
  ) { }
  async onModuleInit() {
    const isInit = this.configService.get<string>('SHOULD_INIT')
    if (Boolean(isInit)) {

      const countUser = await this.userModel.count({})
      const countPermission = await this.permissionModel.count({})
      const countRoles = await this.rolesModel.count({})

console.log(countUser, countPermission, countRoles)
      if (countPermission === 0) {
        await this.permissionModel.insertMany(INIT_PERMISSION)
      }

      if (countRoles === 0) {
        const permission = await this.permissionModel.find({}).select("_id")
        await this.rolesModel.insertMany([
          {
            name: ADMIN_ROLE,
            description: "Full permissions",
            isActive: true,
            permissions: permission,
          },
          {
            name: USER_ROLE,
            description: "User system",
            isActive: true,
            permissions: [],
          }
        ])
      }
      if (countUser === 0) {
        const adminRole = await this.rolesModel.findOne({ name: ADMIN_ROLE })
        const userRole = await this.rolesModel.findOne({ name: USER_ROLE })
        await this.userModel.insertMany([{
          name: "ADMIN",
          email: this.configService.get<string>('ADMIN_EMAIL'),
          password: this.userService.hashPassword(this.configService.get<string>('INIT_PASSWORD')),
          age: 20,
          gender: "MALE",
          address: "EARTH",
          role: adminRole?._id
        },
        {
          name: "USER",
          email: this.configService.get<string>('USER_EMAIL'),
          password: this.userService.hashPassword(this.configService.get<string>('INIT_PASSWORD')),
          age: 20,
          gender: "MALE",
          address: "EARTH",
          role: userRole?._id
        },])
      }
      if (countUser > 0 && countRoles > 0 && countPermission > 0) {
        this.logger.log("Have init sample dataa")
      }
    }
  }
}

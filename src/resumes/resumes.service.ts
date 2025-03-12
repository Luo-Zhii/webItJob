import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from '@/users/user.interface';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Resume, ResumeDocument } from './schemas/resume.schema';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';

export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    private resumeModel: SoftDeleteModel<ResumeDocument>,
    private usersService: UsersService,
    private configService: ConfigService
  ) {}

  async create(createUserCvDto: CreateUserCvDto, user: IUser) {
    const { url, companyId, jobId } = createUserCvDto
    const { email, _id } = user
    const newCv = await this.resumeModel.create({
        url, 
        companyId,
        jobId,
        userId : _id,
        status: "PENDING",
        createdBy: {
            _id,
            email
        },
        history: [
          {
            status: "PENDING",
            updatedAt: new Date, 
            updatedBy: {
              _id: user._id,
            email: user.email,
            }
          }
        ]
    });
    return {
      _id: newCv._id,
      createAt: newCv.createdAt
    };
}

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population} = aqp(qs)
    delete filter.current
    delete filter.pageSize
    
    // similar index in sql
    let offset = (+currentPage - 1) * (+limit)

    // amount of item you want show in this page
    let defaultLimit = +limit ? +limit : 10

    const totalItems = (await this.resumeModel.find(filter)).length 
    // calculate total pages
    const totalPages = Math.ceil(totalItems / defaultLimit)

    const result = await this.resumeModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    // @ts-ignore
    .sort(sort)
    .populate(population)
    .select(projection as any)
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
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found company';

    return this.resumeModel.findOne({
      _id: id
    });
  }

  async findByUser(user: IUser)
  {
    return await this.resumeModel.findOne({
      userId: user._id
    })
      .sort("-createdAt")
      .populate([
        {
          path: "companyId",
          select: {name: 1}
        },
        {
          path: "jobId",
          select: {name: 1}
        }
      ])
    ;
  }

  async update(id: string, status: string, user: IUser) {
    return await this.resumeModel.updateOne(
      { _id: id },
      {
        status,
        updatedBy: {
          _id: user._id,
          email: user.email
        },
        $push: {
          history: {
            status: status,
            updatedAt: new Date,
            updatedBy: {
              _id: user._id,
              email: user.email,
            }
          }
        }
      }
    )
  }

  async removeById(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'not found jobs';
    
    const foundUser = await this.usersService.findOne(id);
    if (foundUser === 'not found user' || foundUser.email === this.configService.get<string>('ADMIN_EMAIL')) {
      throw new Error('Invalid user');
    }


    await this.resumeModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        }
      })
    return this.resumeModel.softDelete({
      _id: id,
    },
  );
  }
}

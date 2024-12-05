import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Redis } from 'ioredis';
import { CreateUserDto, UpdateUserProfileDto } from './dto';
import { Metadata } from '../utils/interfaces/metadata.interface';
import { UserEntity, UserEntityDocument } from './entities/user.entity';
@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntityDocument>,
    // @InjectRedis() private redis: Redis,
  ) {}

  async createUser(data: CreateUserDto) {
    return new this.userModel(data).save();
  }

  async updateUserProfile(data: UpdateUserProfileDto) {
    return this.userModel.updateOne({_id:data.id},{$set:data})
  }

  async getUserByMobile(mobile: string) {
    return this.userModel.findOne({
      deletedAt: null,
      status: { $ne: 'pending' },
      mobile: mobile,
    });
  }

  async getUserById(data) {
    return this.userModel.findOne({ _id: data.id });
  }

  async getUsersByUsernameOrMobile(
    data: { usernameOrMobile: string },
    meta: Metadata,
  ) {
    this.logger.verbose(data.usernameOrMobile)
    return this.userModel.find({
      $or: [
        { mobile: data.usernameOrMobile },
        { username: data.usernameOrMobile },
      ],
    });
  }
}

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto, GetUserProfileDto, UpdateUserProfileDto } from './dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { UsersRepository } from './users.repository';
import { BaseService } from '../utils';
@Injectable()
export class UsersService extends BaseService {
  protected readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(UsersRepository.name) private readonly repository: UsersRepository,
    protected readonly amqpConnection: AmqpConnection,
  ) {
    super('Users', amqpConnection);
  }

  async createUser(data: CreateUserDto) {
    try {
      const user = await this.repository.getUserByMobile(data.mobile);
      if (user)
        throw new HttpException(
          'User with the same mobile exists!',
          HttpStatus.BAD_REQUEST,
        );
        await this.repository.createUser(data);
      return {
        success: true,
        data,
        meta:{},
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        data,
        meta: {
          messages: [
            {
              domain: 'Users',
              context: this.createUser.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  async updateUserProfile(data: UpdateUserProfileDto) {
    this.logger.log('updateUserProfile')
    try {
      const user = await this.repository.getUserById(data.id);
      if (!user)
        throw new HttpException(
          'No user with this id number was found!',
          HttpStatus.BAD_REQUEST,
        );
        await this.repository.updateUserProfile(data);
      return {
        success: true,
        data,
        meta:{},
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        data,
        meta: {
          messages: [
            {
              domain: 'Users',
              context: this.createUser.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  async getUserProfile(data: GetUserProfileDto, meta) {
    try {
      const user = await this.repository.getUserById(data);
      if (!user)
        throw new HttpException(
          'No user with profile was found !',
          HttpStatus.NOT_FOUND,
        );
      return {
        status: true,
        data: { user },
        meta,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        data,
        meta: {
          messages: [
            {
              domain: 'Users',
              context: this.createUser.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  async getUsersByUsernameOrMobile(data, meta) {
    this.logger.log('getUsersByUsernameOrMobile')
    console.log(data)
    try {
      const users = await this.repository.getUsersByUsernameOrMobile(data, meta);
      console.log(users);
      return {
        status: true,
        data: users,
        meta,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        data,
        meta: {
          messages: [
            {
              domain: 'Users',
              context: this.createUser.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }
}

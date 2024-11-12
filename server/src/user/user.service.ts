import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserMapper } from '../common/mappers/user-mapper';
import { compareDataToHash, encrypt } from 'src/common/bcrypt';
import {
  RetrieveUserDto,
  UserResponseDto,
  UserValidateDto,
} from './dto/retrieve-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  findOne(user_id: number): Promise<RetrieveUserDto>;
  findOne(username: string): Promise<User>;
  /*
   *
   */
  async findOne(param: number | string): Promise<UserResponseDto | User> {
    try {
      let user = new User();
      if (typeof param === 'number') {
        user = await this.userRepository.findOneByOrFail({
          user_id: param,
        });
        return UserMapper.toResponseDto(user);
      } else {
        user = await this.userRepository.findOneByOrFail({
          username: param,
        });
        return user;
      }
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();

    const userMapped = users.map((user) => UserMapper.toResponseDto(user));

    return userMapped;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const userToEntity = UserMapper.toEntity(createUserDto);
      userToEntity.password_hash = await encrypt(createUserDto.password);

      const createInstance = this.userRepository.create(userToEntity);
      const createdUser = await this.userRepository.save(createInstance);

      return UserMapper.toResponseDto(createdUser);
    } catch (e) {
      return e;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * Check the provided user information with the database
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordMatching = await compareDataToHash(
      password,
      user.password_hash,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException("Password doesn't match");
    }

    return UserMapper.toResponseDto(user);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RetrieveUserDto } from './dto/retrieve-user.dto';
import { UserMapper } from '../common/mappers/user-mapper';
import { encrypt } from 'src/common/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
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

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();

    const userMapped = users.map((user) => UserMapper.toResponseDto(user));

    return userMapped;
  }

  async findOne(user_id: number): Promise<RetrieveUserDto> {
    try {
      const response = await this.userRepository.findOneByOrFail({
        user_id: user_id,
      });
      return response;
    } catch (e) {
      throw e;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

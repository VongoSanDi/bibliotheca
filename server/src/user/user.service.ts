import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
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
import { CreateUserSchema, RetrieveUserSchema } from './schemas/user.schema';
import { ValidateSchema } from 'src/common/utils/validators';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  /*
   *
   */
  async findOne(
    dto: RetrieveUserDto,
  ): Promise<UserResponseDto | UserValidateDto> {
    try {
      const validatedDto = ValidateSchema<RetrieveUserDto>(
        RetrieveUserSchema,
        dto,
      );
      const { param, includePassword } = validatedDto;

      const user =
        typeof param === 'number'
          ? await this.userRepository.findOneByOrFail({ user_id: param })
          : await this.userRepository.findOneByOrFail({ username: param });
      if (includePassword) {
        return {
          ...UserMapper.toResponseDto(user),
          password_hash: user.password_hash,
        };
      }
      return UserMapper.toResponseDto(user);
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
      const validateSchema = CreateUserSchema.safeParse(createUserDto);
      if (!validateSchema.success) {
        throw new BadRequestException(validateSchema.error.errors);
      }
      const userToEntity = UserMapper.toEntity(createUserDto);
      userToEntity.password_hash = await encrypt(createUserDto.password);

      const createInstance = this.userRepository.create(userToEntity);
      const createdUser = await this.userRepository.save(createInstance);

      return UserMapper.toResponseDto(createdUser);
    } catch (e) {
      return e;
    }
  }

  update(id: number, dto: UpdateUserDto) {
    return 'This action update';
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
    try {
      const user = (await this.findOne({
        param: username,
        includePassword: true,
      })) as UserValidateDto;
      console.log('clg', user);

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
      return { user_id: user.user_id, username: user.username };
    } catch (e) {
      throw e;
    }
  }
}

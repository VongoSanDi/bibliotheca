import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { compareDataToHash, encrypt } from 'src/common/bcrypt';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { UserMapper } from 'src/common/mappers/user-mapper';
import { PageOptionsSchema } from 'src/common/schemas/common';
import { ValidateSchema } from 'src/common/utils/validators';
import { Repository } from 'typeorm';
import {
  RetrieveUserDto,
  UserResponseDto,
  UserValidateDto,
} from './dto/retrieve-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserSchema, RetrieveUserSchema } from './schemas/user.schema';

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
      console.log('dto', dto);
      const validatedDto = ValidateSchema<RetrieveUserDto>(
        RetrieveUserSchema,
        dto,
      );
      const { param, includePassword } = validatedDto;

      const user =
        typeof param === 'number'
          ? await this.userRepository.findOneByOrFail({ id: param })
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

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<{ results: UserResponseDto[]; itemCount: number }> {
    try {
      const validatePageOptions = ValidateSchema<PageOptionsDto>(
        PageOptionsSchema,
        pageOptionsDto,
      );
      const { take, skip, order, orderBy } = validatePageOptions;

      const [users, itemCount] = await this.userRepository.findAndCount({
        take: take,
        skip: skip,
        order: { [orderBy]: order },
      });

      const userMapped = users.map((user) => UserMapper.toResponseDto(user));

      return { results: userMapped, itemCount };
    } catch (e) {
      throw e;
    }
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
      return { id: user.id, username: user.username };
    } catch (e) {
      throw e;
    }
  }
}

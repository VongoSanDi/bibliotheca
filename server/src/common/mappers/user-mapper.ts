import {
  UserResponseDto,
  UserValidateDto,
} from 'src/user/dto/retrieve-user.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { User } from '../../user/entities/user.entity';

export class UserMapper {
  static toEntity(createUserDto: CreateUserDto): Partial<User> {
    return {
      username: createUserDto.username,
      email: createUserDto.email,
      country_id: createUserDto.country_id,
      gender_id: createUserDto.gender_id,
      birth_date: createUserDto.birth_date,
    };
  }

  static toResponseDto(user: User): UserResponseDto {
    let responseDto = new UserResponseDto();
    responseDto = {
      id: user.id,
      username: user.username,
    };
    return responseDto;
  }

  static toResponseDtoWithPassword(user: User): UserValidateDto {
    let responseDto = new UserValidateDto();
    responseDto = {
      id: user.id,
      username: user.username,
      password_hash: user.password_hash,
    };
    return responseDto;
  }
}

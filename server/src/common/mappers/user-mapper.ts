import { CreateUserDto, UserResponseDto } from '../../user/dto/create-user.dto';
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
    console.log('aa', user);

    responseDto = {
      user_id: user.user_id,
      username: user.username,
    };
    return responseDto;
  }
}

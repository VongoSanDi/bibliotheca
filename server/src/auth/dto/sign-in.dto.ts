import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from 'src/user/dto/retrieve-user.dto';

export class SignInDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class signInResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  user: UserResponseDto;
}

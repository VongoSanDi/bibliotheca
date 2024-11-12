import { ApiProperty } from '@nestjs/swagger';

export class RetrieveUserDto {
  param: number | string;
}
// export class RetrieveUserDto {
//   user_id: number;
//   username: string;
//   email: string;
//   password_hash: string;
//   birth_date: Date;
//   gender_id: number;
//   country_id: number;
//   last_login: Date;
// }

export class UserResponseDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  username: string;
}

export class UserValidateDto {
  user_id: number;
  username: string;
  password_hash: string;
}

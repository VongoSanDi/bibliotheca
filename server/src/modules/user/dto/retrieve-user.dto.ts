import { ApiProperty } from '@nestjs/swagger';

export class RetrieveUserDto {
  param: number | string;
  includePassword?: boolean = false;
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
  constructor(data: Partial<UserResponseDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;
}

export class UserValidateDto extends UserResponseDto {
  constructor(data: Partial<UserValidateDto>) {
    super(data);
    if (data) {
      Object.assign(this, data);
    }
  }
  password_hash: string;
}

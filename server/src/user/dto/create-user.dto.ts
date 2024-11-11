import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  country_id: number;

  @ApiPropertyOptional()
  birth_date?: Date;

  @ApiPropertyOptional()
  gender_id?: number;
}

export class UserResponseDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  username: string;
}

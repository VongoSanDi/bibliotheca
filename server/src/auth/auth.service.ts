import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { SignInDto, signInResponseDto } from './dto/sign-in.dto';
import { ValidateSchema } from 'src/common/utils/validators';
import { signInSchema } from './schemas/auth';

interface Payload {
  username: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInDto): Promise<signInResponseDto> {
    try {
      const validateDto = ValidateSchema<SignInDto>(signInSchema, dto);
      const { username, password } = validateDto;
      const user = await this.userService.validateUser(username, password);

      const payload = { username: user.username, sub: user.id };
      return {
        access_token: await this.signJwt(payload),
        user: user,
      };
    } catch (e) {
      throw e;
    }
  }

  /*
   * Create a new jwt
   */
  async signJwt(payload: Payload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}

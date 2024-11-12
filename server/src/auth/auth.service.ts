import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { signInResponseDto } from './dto/sign-in.dto';

interface Payload {
  username: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(username: string, password: string): Promise<signInResponseDto> {
    const user = await this.userService.validateUser(username, password);

    const payload = { username: user.username, sub: user.user_id };
    return {
      access_token: await this.signJwt(payload),
      user: user,
    };
  }

  /*
   * Create a new jwt
   */
  async signJwt(payload: Payload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}

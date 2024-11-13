import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, signInResponseDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto): Promise<signInResponseDto> {
    return this.authService.signIn(signInDto);
  }
}

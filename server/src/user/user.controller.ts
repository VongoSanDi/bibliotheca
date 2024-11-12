import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RetrieveUserDto, UserResponseDto } from './dto/retrieve-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve all users' })
  async findAll(): Promise<UserResponseDto[]> {
    return await this.userService.findAll();
  }

  @Get(':user_id')
  @ApiOperation({ summary: 'Retrieve an user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserResponseDto,
  })
  async findOne(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<RetrieveUserDto> {
    return await this.userService.findOne(user_id);
  }

  @Get(':id/library')
  @ApiOperation({ summary: 'Retrieve an user collection' })
  async findOneLibrary(@Param('id') id: string): Promise<RetrieveUserDto> {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an user' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

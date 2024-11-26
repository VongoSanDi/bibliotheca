import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/retrieve-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { PaginatedResult } from 'src/common/types/response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve all users' })
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedResult<UserResponseDto>> {
    const { results, itemCount } =
      await this.userService.findAll(pageOptionsDto);
    return {
      results,
      pageOptionsDto,
      itemCount,
    };
  }

  @Get(':id')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve an user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserResponseDto,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const dto = {
      param: id,
    };
    return await this.userService.findOne(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an user' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an user' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

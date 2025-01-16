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
import { PageOptionsDto } from 'src/common/dto/PageOptionsDto';
import { PaginatedResponse } from 'src/common/types/response';
import { Public } from '../auth/decorators/public.decorator';
import { ApiPaginationQuery } from 'src/common/decorators/pagination.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Unable de create user - validation error',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  @ApiPaginationQuery()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedResponse<UserResponseDto>> {
    const { data, itemCount } =
      await this.userService.findAll(pageOptionsDto);
    return {
      data,
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
  @ApiResponse({
    status: 404,
    description: 'Resource not found',
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

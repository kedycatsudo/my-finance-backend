import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { users } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<users[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<users> {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException(`User with id=${id} not found.`);
    return user;
  }
  @Post()
  async create(@Body() CreateUserDto: CreateUserDto): Promise<users> {
    return this.usersService.create(CreateUserDto);
  }
}

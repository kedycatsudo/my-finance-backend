import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Post()
  async create(
    @Body() body: { username: string; email: string; password: string },
  ) {
    //add DTOS and validation later!!!
    return this.usersService.create(body);
  }
}

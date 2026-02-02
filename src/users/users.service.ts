import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return this.prisma.users.findMany();
  }
  async findOne(id: string) {
    return this.prisma.users.findUnique({ where: { id } });
  }
  async create(data: { username: string; email: string; password: string }) {
    return this.prisma.users.create({ data });
  }
}

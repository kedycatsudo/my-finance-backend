import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOutcomeSourceDto } from './dto/create-source.dto';
import { UpdateOutcomeSourceDto } from './dto/update-source.dto';

@Injectable()
export class OutcomesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOutcomeSourceDto) {
    return this.prisma.financeSources.create({
      data: {
        name: dto.name,
        description: dto.description,
        user_id: userId,
        type: 'outcome',
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.financeSources.findMany({
      where: { user_id: userId, type: 'outcome' },
      include: { finance_payments: true },
    });
  }
}

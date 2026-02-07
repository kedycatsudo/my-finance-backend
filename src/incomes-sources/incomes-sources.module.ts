import { Module } from '@nestjs/common';
import { IncomesSourcesService } from './incomes-sources.service';
import { IncomesSourcesController } from './incomes-sources.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  providers: [IncomesSourcesService, PrismaService],
  controllers: [IncomesSourcesController],
})
export class IncomesSourcesModule {}

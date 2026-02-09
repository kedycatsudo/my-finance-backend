import { Module } from '@nestjs/common';
import { InvestmentSourceController } from './investment-source.controller';
import { InvestmentSourceService } from './investment-source.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [InvestmentSourceController],
  providers: [InvestmentSourceService, PrismaService],
})
export class InvestmentSourceModule {}

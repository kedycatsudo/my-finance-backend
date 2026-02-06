import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOutcomePaymentDto } from './dto/create-payment.dto';
import { Prisma, $Enums } from '@prisma/client';
@Injectable()
export class OutcomesPaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(
    userId: string,
    sourceId: string,
    dto: CreateOutcomePaymentDto,
  ) {
    const source = await this.prisma.financeSources.findFirst({
      where: { id: sourceId, user_id: userId, type: 'outcome' },
    });
    if (!source) throw new Error('Source not found or unautharized.');

    return this.prisma.financePayments.create({
      data: {
        name: dto.name,
        user_id: userId,
        amount: dto.amount,
        loop: dto.loop,
        status: (dto.status as $Enums.payment_status) ?? $Enums.payment_status,
        payment_type:
          (dto.payment_type as $Enums.payment_type) ?? $Enums.payment_type,
        financesource_id: sourceId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.financePayments.findMany({
      where: { user_id: userId, finance_sources: { type: 'outcome' } },
      include: { finance_sources: true },
    });
  }
}

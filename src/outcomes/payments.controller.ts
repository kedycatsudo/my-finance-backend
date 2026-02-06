import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OutcomesPaymentService } from './payments.service';
import { CreateOutcomePaymentDto } from './dto/create-payment.dto';

interface AuthenticatedRequest extends ExpressRequest {
  user: { userId: string; username: string };
}
@Controller('outcomes/sources/:sourceId/payments')
@UseGuards(JwtAuthGuard)
export class OutcomesPaymentsController {
  constructor(private readonly service: OutcomesPaymentService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Param('sourceId') sourceId: string,
    @Body() dto: CreateOutcomePaymentDto,
  ) {
    return this.service.createPayment(req.user.userId, sourceId, dto);
  }
}

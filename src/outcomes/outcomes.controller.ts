import {
  Controller,
  UseGuards,
  Get,
  Request,
  Body,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OutcomesService } from './outcomes.service';
import { Request as ExpressRequest } from 'express';
import { CreateOutcomeSourceDto } from './dto/create-source.dto';
interface AuthenticatedRequest extends ExpressRequest {
  user: { userId: string; username: string };
}
@Controller('outcomes/sources')
@UseGuards(JwtAuthGuard)
export class OutcomesController {
  constructor(private readonly outcomesService: OutcomesService) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() dot: CreateOutcomeSourceDto,
  ) {
    const source = await this.outcomesService.create(req.user.userId, dot);
    return source;
  }

  @Get()
  async findAll(@Request() req: AuthenticatedRequest) {
    const sources = await this.outcomesService.findAll(req.user.userId);
    return sources;
  }
}

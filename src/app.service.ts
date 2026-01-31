import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  get dbUrl(): string {
    // Will throw at app start if not validated by Joi above
    return this.configService.get<string>('DATABASE_URL');
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApplicationConfigService {
  constructor(private config: ConfigService) {}

  get exchangeRateApi() {
    return {
      key: this.config.get('EXCHANGE_RATE_API_KEY'),
      url: this.config.get('EXCHANGE_RATE_BASE_URL'),
    };
  }
  get setting() {
    return {
      env: this.config.get('NODE_ENV'),
      port: this.config.get('APP_PORT'),
    };
  }
}

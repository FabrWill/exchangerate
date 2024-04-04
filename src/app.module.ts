import { Module } from '@nestjs/common';
import { ApplicationConfigModule } from '@/config/application_config.module';
import { ExchangeModule } from '@/exchange/exchange.module';

@Module({
  imports: [
    ApplicationConfigModule,
    ExchangeModule,
  ]
})
export class AppModule {}

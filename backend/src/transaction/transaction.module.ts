import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TransactionService } from "./services/transaction.service";
import { ApplicationConfigModule } from "@/config/application_config.module";
import { TransactionController } from "./infra/transaction.controller";
import { ApplicationConfigService } from "@/config/application_config.service";
import { CurrencyController } from "./infra/currency.controller";
import { CurrencyService } from "./services/currency.service";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ApplicationConfigModule],
      useFactory: (config: ApplicationConfigService) => ({
        ttl: config.cacheTTL,
      }),
      inject: [ApplicationConfigService],
    }),
    HttpModule.registerAsync({
      imports: [ApplicationConfigModule],
      useFactory: (config: ApplicationConfigService) => ({
        baseURL: `${config.exchangeRateApi.url}/${config.exchangeRateApi.key}/`,
      }),
      inject: [ApplicationConfigService],
    }),
  ],
  controllers: [TransactionController, CurrencyController],
  providers: [TransactionService, CurrencyService],
  exports: [TransactionService, CurrencyService],
})
export class TransactionModule {}

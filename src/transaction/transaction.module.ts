import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TransactionService } from "./services/transaction.service";
import { ApplicationConfigModule } from "@/config/application_config.module";
import { TransactionController } from "./infra/transaction.controller";
import { ApplicationConfigService } from "@/config/application_config.service";

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ApplicationConfigModule],
      useFactory: (config: ApplicationConfigService) => ({
        baseURL: config.exchangeRateApi.url,
      }),
      inject: [ApplicationConfigService],
    }),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}

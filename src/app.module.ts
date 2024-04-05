import { Module } from "@nestjs/common";
import { ApplicationConfigModule } from "@/config/application_config.module";
import { TransactionModule } from "./transaction/transaction.module";

@Module({
  imports: [ApplicationConfigModule, TransactionModule],
})
export class AppModule {}

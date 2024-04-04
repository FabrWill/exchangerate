import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ExchangeService } from "./services/exchange.service";
import { ApplicationConfigModule } from "@/config/application_config.module";
import { ApplicationConfigService } from "@/config/application_config.service";
import { ExchangeController } from "./infra/exchange.controller";

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
    controllers: [ExchangeController],
    providers: [ExchangeService],
    exports: [ExchangeService],
})
export class ExchangeModule {}

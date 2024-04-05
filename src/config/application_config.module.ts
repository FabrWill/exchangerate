import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ApplicationConfigService } from "./application_config.service";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ApplicationConfigService],
  exports: [ApplicationConfigService],
})
export class ApplicationConfigModule {}

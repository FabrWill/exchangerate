import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export default class SwaggerSetup {
  static apply(instance: INestApplication<any>) {
    const config = new DocumentBuilder()
      .setTitle("Exchange Rate API")
      .setDescription("This is a simple API that allows you to convert currencies using the latest exchange rates.")
      .setVersion("1.0")
      .build();

    const document = SwaggerModule.createDocument(instance, config);

    SwaggerModule.setup("api", instance, document);
    Logger.log("Mapped {/api} to Swagger documentation ", "SwaggerSetup");
  }
}

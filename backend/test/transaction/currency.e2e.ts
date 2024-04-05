import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { createTestApp } from "../test-app";

describe("CurrencyController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  it("/currency/USD (GET)", () => {
    return request(app.getHttpServer())
      .get("/currency/USD")
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty("base_code", "USD");
        expect(res.body).toHaveProperty("conversion_rates");
        expect(res.body).toHaveProperty("last_update");
      });
  });

  it("/currency/invalidCurrencyCode (GET) with invalid currency code", () => {
    return request(app.getHttpServer())
      .get("/currency/invalidCurrencyCode")
      .expect(400)
      .expect(res => {
        expect(res.body).toHaveProperty("message");
      });
  });

  // Outros testes podem ser adicionados aqui conforme necessário
});

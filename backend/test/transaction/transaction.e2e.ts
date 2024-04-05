import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { createTestApp } from "../test-app";

describe("ExchangeController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
  });

  it("/transaction/USD/EUR/100 (GET)", () => {
    return request(app.getHttpServer())
      .get("/transaction/USD/EUR/100")
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty("result");
        expect(res.body.result).toHaveProperty("from");
      });
  });

  it("/transaction/YYY/EUR/100 (GET) with invalid currencies", () => {
    return request(app.getHttpServer())
      .get("/transaction/YYY/EUR/100")
      .expect(400)
      .expect(res => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Código da Moeda inválido");
      });
  });

  it("/transaction/USD/EUR/-100 (GET) with invalid amount", () => {
    return request(app.getHttpServer())
      .get("/transaction/USD/EUR/-100")
      .expect(400)
      .expect(res => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Valor da transação inválido");
      });
  });

  it("/transaction/USD/EUR/undefined (GET) with undefined amount", () => {
    return request(app.getHttpServer())
      .get("/transaction/USD/EUR/undefined")
      .expect(400)
      .expect(res => {
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toContain("Valor da transação inválido");
      });
  });
});

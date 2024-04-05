import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { ApplicationConfigService } from "@/config/application_config.service";
import { TransactionDto } from "@/transaction/domain/dto/transaction.dto";
import { TransactionService } from "@/transaction/services/transaction.service";

describe("TransactionService", () => {
  let service: TransactionService;
  let httpService: HttpService;
  let configService: ApplicationConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ApplicationConfigService,
          useValue: {
            exchangeRateApi: {
              key: "api_key",
              url: "http://api.example.com",
            },
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ApplicationConfigService>(ApplicationConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getTransaction", () => {
    it("should return transaction data", async () => {
      const transaction: TransactionDto = {
        from: "USD",
        to: "EUR",
        amount: 100,
      };

      const expectedResult = { convertedAmount: 88 };

      jest.spyOn(httpService, "get").mockImplementation(() => of({ data: expectedResult } as any));

      const result = await service.getTransaction(transaction);
      expect(result).toEqual(expectedResult);
      expect(httpService.get).toHaveBeenCalledWith(`/${configService.exchangeRateApi.key}/pair/${transaction.from}/${transaction.to}/${transaction.amount}`);
    });

    it("should handle errors", async () => {
      const transaction: TransactionDto = {
        from: "USD",
        to: "EUR",
        amount: 100,
      };

      jest.spyOn(httpService, "get").mockImplementation(() => {
        throw new Error("API Error");
      });

      await expect(service.getTransaction(transaction)).rejects.toThrow();
    });
  });
});

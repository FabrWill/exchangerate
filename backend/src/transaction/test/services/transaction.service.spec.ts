import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { Cache } from "cache-manager";
import { lastValueFrom } from "rxjs";
import { TransactionDto } from "@/transaction/domain/dto/transaction.dto";
import { ApplicationConfigService } from "@/config/application_config.service";
import { TransactionService } from "@/transaction/services/transaction.service";
import { ExchangeApiTransactionInterface } from "@/transaction/domain/interfaces/exchange_api_transaction.interface";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { DateTime } from "luxon";

describe("TransactionService", () => {
  let service: TransactionService;
  let httpService: HttpService;
  let configService: ApplicationConfigService;
  let cacheManager: Cache;

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
            formatDate: "yyyy-MM-dd HH:mm:ss",
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ApplicationConfigService>(ApplicationConfigService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

      const expectedResult = { conversion_rate: 1, time_last_update_unix: DateTime.now().toSeconds() };

      jest.spyOn(httpService, "get").mockImplementation(() => of({ data: expectedResult } as any));

      const result = await service.getTransaction(transaction);
      expect(result.conversion_rate).toBe(expectedResult.conversion_rate);
      expect(httpService.get).toHaveBeenCalledWith(`/pair/${transaction.from}/${transaction.to}`);
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

  describe("getExchangeApiTransactionValue", () => {
    it("should return the exchange API transaction value", async () => {
      const from = "USD";
      const to = "EUR";

      const exchange: Partial<ExchangeApiTransactionInterface> = {
        conversion_rate: 0.88,
        time_last_update_unix: 1634567890,
      };

      const requestMock = {
        data: exchange,
      };

      jest.spyOn(httpService, "get").mockReturnValue(of(requestMock));

      const result = await service.getTransaction({ from, to, amount: 100 });

      expect(result.conversion_rate).toBe(exchange.conversion_rate);
      expect(httpService.get).toHaveBeenCalledWith("/pair/USD/EUR");
    });
  });

  describe("calculateConversionResult", () => {
    it("should calculate the conversion result", () => {
      const exchange: any = {
        conversion_rate: 0.88,
        time_last_update_unix: 1634567890,
      };

      const amount = 100;

      const result = service.calculateConversionResult(exchange, amount);

      expect(result).toBe(88);
    });
  });

  describe("calculateBaseRate", () => {
    it("should calculate the base rate", () => {
      const exchange: any = {
        conversion_rate: 0.88,
        time_last_update_unix: 1634567890,
      };

      const result = service.calculateBaseRate(exchange);

      expect(result).toBe(1.14);
    });
  });

  describe("getLastUpdateData", () => {
    it("should return the last update data", () => {
      const date = DateTime.now();

      const exchange: any = {
        conversion_rate: 0.88,
        time_last_update_unix: date.toSeconds(),
      };

      const result = service.getLastUpdateData(exchange);

      expect(result).toBe(date.toFormat("yyyy-MM-dd HH:mm:ss"));
    });
  });
});

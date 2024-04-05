import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { Cache } from "cache-manager";
import { CurrencyService } from "@/transaction/services/currency.service";
import { ExchangeApiCurrencyInterface } from "@/transaction/domain/interfaces/exchange_api_currency.interface";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { ApplicationConfigService } from "@/config/application_config.service";
import { DateTime } from "luxon";

describe("CurrencyService", () => {
  let service: CurrencyService;
  let httpService: HttpService;
  let configService: ApplicationConfigService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ApplicationConfigService,
          useValue: {
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

    service = module.get<CurrencyService>(CurrencyService);
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

  describe("getLatestCurrencyService", () => {
    it("should return the latest currency service data", async () => {
      const currency = "USD";

      const exchange: any = {
        base_code: "USD",
        conversion_rates: {
          EUR: 0.88,
          GBP: 0.73,
        },
        time_last_update_unix: 1634567890,
      };

      jest.spyOn(httpService, "get").mockImplementation(() => of({ data: exchange } as any));
      jest.spyOn(service, "getLastUpdateData").mockReturnValue("2022-10-19 12:34:56");

      const result = await service.getLatestCurrencyService(currency);

      expect(result.base_code).toBe(exchange.base_code);
      expect(result.conversion_rates).toBe(exchange.conversion_rates);
      expect(result.last_update).toBe("2022-10-19 12:34:56");
      expect(service.getLastUpdateData).toHaveBeenCalledWith(exchange);
    });

    it("should handle errors", async () => {
      const currency = "USD";

      jest.spyOn(httpService, "get").mockImplementation(() => {
        throw new Error("API Error");
      });

      await expect(service.getLatestCurrencyService(currency)).rejects.toThrow();
    });
  });

  describe("getExchangeApiCurrencyValue", () => {
    it("should return the exchange API currency value", async () => {
      const currency = "USD";

      const exchange: Partial<ExchangeApiCurrencyInterface> = {
        base_code: "USD",
        conversion_rates: {
          EUR: 0.88,
          GBP: 0.73,
        },
        time_last_update_unix: 1634567890,
      };

      const requestMock = {
        data: exchange,
      };

      jest.spyOn(httpService, "get").mockReturnValue(of(requestMock));

      const result = await service.getLatestCurrencyService(currency);

      expect(result.base_code).toBe(exchange.base_code);
      expect(result.conversion_rates).toBe(exchange.conversion_rates);
      expect(httpService.get).toHaveBeenCalledWith(`/latest/${currency}`);
    });

    it("should handle errors", async () => {
      const currency = "USD";

      jest.spyOn(httpService, "get").mockImplementation(() => {
        throw new Error("API Error");
      });

      await expect(service.getLatestCurrencyService(currency)).rejects.toThrow();
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

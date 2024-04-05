import { CurrencyController } from "@/transaction/infra/currency.controller";
import { CurrencyService } from "@/transaction/services/currency.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("CurrencyController", () => {
  let controller: CurrencyController;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        {
          provide: CurrencyService,
          useValue: {
            getLatestCurrencyService: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CurrencyController>(CurrencyController);
    currencyService = module.get<CurrencyService>(CurrencyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getConversion", () => {
    it("should call getLatestCurrencyService and return the result", async () => {
      const currency = "USD";
      const expectedResult: any = { conversion_rate: 1.2 };

      jest.spyOn(currencyService, "getLatestCurrencyService").mockResolvedValue(expectedResult);

      const result = await controller.getConversion({ currency });

      expect(currencyService.getLatestCurrencyService).toHaveBeenCalledWith(currency);
      expect(result).toBe(expectedResult);
    });
  });
});

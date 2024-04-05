import { Test, TestingModule } from "@nestjs/testing";
import { TransactionController } from "@/transaction/infra/transaction.controller";
import { TransactionService } from "@/transaction/services/transaction.service";

describe("TransactionController", () => {
  let controller: TransactionController;
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            getTransaction: jest.fn(() => Promise.resolve("Mocked Value")),
          },
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<TransactionService>(TransactionService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should get conversion", async () => {
    const transaction = {
      from: "USD",
      to: "EUR",
      amount: 100,
    };

    const result = await controller.getConversion(transaction);

    expect(result).toBe("Mocked Value");
    expect(service.getTransaction).toHaveBeenCalledWith(transaction);
  });
});

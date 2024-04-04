import { Test, TestingModule } from "@nestjs/testing";
import { ExchangeController } from "@/exchange/infra/exchange.controller";
import { ExchangeService } from "@/exchange/services/exchange.service";

describe("ExchangeController", () => {
    let controller: ExchangeController;
    let service: ExchangeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExchangeController],
            providers: [
                {
                    provide: ExchangeService,
                    useValue: {
                        getExchange: jest.fn(() =>
                            Promise.resolve("Mocked Value")
                        ),
                    },
                },
            ],
        }).compile();

        controller = module.get<ExchangeController>(ExchangeController);
        service = module.get<ExchangeService>(ExchangeService);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    it("should get conversion", async () => {
        expect(await controller.getConversion("USD", "EUR", 100)).toBe(
            "Mocked Value"
        );
        expect(service.getExchange).toHaveBeenCalledWith("USD", "EUR", 100);
    });
});

import { Controller, Get, Inject, Param } from "@nestjs/common";
import { CurrencyService } from "../services/currency.service";
import { CurrencyDTO } from "../domain/dto/currency.dto";

@Controller("currency")
export class CurrencyController {
  constructor(@Inject(CurrencyService) private currencyService: CurrencyService) {}

  @Get(":currency")
  async getConversion(@Param() params: CurrencyDTO) {
    const data = this.currencyService.getLatestCurrencyService(params.currency);

    return data;
  }
}

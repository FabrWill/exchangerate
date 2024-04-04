import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ExchangeService } from "../services/exchange.service";

@Controller('convert')
export class ExchangeController {
  constructor(@Inject(ExchangeService) private exchangeService: ExchangeService) {}

  @Get(':to/:from/:amount')
  async getConversion(
    @Param('to') to: string,
    @Param('from') from: string,
    @Param('amount') amount: number,
  ) {
    return this.exchangeService.getExchange(from, to, amount);
  }
}
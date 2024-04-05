import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { TransactionDto } from "../domain/dto/transaction.dto";
import { ApplicationConfigService } from "@/config/application_config.service";
import { ExchangeApiErrorHandler } from "../domain/exceptions/exchange_api.exceptions";
import { ExchangeApiTransactionInterface } from "../domain/interfaces/exchange_api_transaction.interface";
import { DateTime } from "luxon";
import { Cacheable } from "@/shared/decorators/cacheable.decorator";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class TransactionService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
    private config: ApplicationConfigService,
  ) {}

  async getTransaction(transaction: TransactionDto) {
    const { from, to, amount } = transaction;
    const exchange = await this.getExchangeApiTransactionValue(from, to);

    return {
      from,
      to,
      amount,
      conversion_rate: exchange.conversion_rate,
      base_rate: this.calculateBaseRate(exchange),
      conversion_result: this.calculateConversionResult(exchange, amount),
      last_update: this.getLastUpdateData(exchange),
    };
  }

  @Cacheable("transaction")
  private async getExchangeApiTransactionValue(from: string, to: string): Promise<ExchangeApiTransactionInterface> {
    const url = `/pair/${from}/${to}`;

    try {
      const request = this.httpService.get<ExchangeApiTransactionInterface>(url);

      const { data } = await lastValueFrom(request);

      return data;
    } catch (error) {
      throw ExchangeApiErrorHandler.handleError(error);
    }
  }

  calculateConversionResult(exchange: ExchangeApiTransactionInterface, amount: number): number {
    const conversionResult = amount * exchange.conversion_rate;

    return Number(conversionResult.toFixed(2));
  }

  calculateBaseRate(exchange: ExchangeApiTransactionInterface): number {
    const baseRate = 1 / exchange.conversion_rate;

    return Number(baseRate.toFixed(2));
  }

  getLastUpdateData(exchange: ExchangeApiTransactionInterface): string {
    return DateTime.fromSeconds(exchange.time_last_update_unix).toFormat(this.config.formatDate);
  }
}

import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { ExchangeApiErrorHandler } from "../domain/exceptions/exchange_api.exceptions";
import { ExchangeApiCurrencyInterface } from "../domain/interfaces/exchange_api_currency.interface";
import { DateTime } from "luxon";
import { ApplicationConfigService } from "@/config/application_config.service";
import { Cacheable } from "@/shared/decorators/cacheable.decorator";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class CurrencyService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
    private config: ApplicationConfigService,
  ) {}

  async getLatestCurrencyService(currency: string) {
    const data = await this.getExchangeApiCurrencyValue(currency);

    return {
      base_code: data.base_code,
      conversion_rates: data.conversion_rates,
      last_update: this.getLastUpdateData(data),
    };
  }

  @Cacheable("current_currency")
  private async getExchangeApiCurrencyValue(currency: string): Promise<ExchangeApiCurrencyInterface> {
    try {
      const url = `/latest/${currency}`;
      const request = this.httpService.get<ExchangeApiCurrencyInterface>(url);

      const { data } = await lastValueFrom(request);

      return data;
    } catch (error) {
      throw ExchangeApiErrorHandler.handleError(error);
    }
  }

  getLastUpdateData(exchange: ExchangeApiCurrencyInterface): string {
    return DateTime.fromSeconds(exchange.time_last_update_unix).toFormat(this.config.formatDate);
  }
}

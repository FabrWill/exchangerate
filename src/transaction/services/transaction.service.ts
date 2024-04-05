import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { TransactionDto } from "../domain/dto/transaction.dto";
import { ApplicationConfigService } from "@/config/application_config.service";
import { ExchangeApiErrorHandler } from "../domain/exceptions/exchange_api.exceptions";

@Injectable()
export class TransactionService {
  constructor(
    private httpService: HttpService,
    private config: ApplicationConfigService,
  ) {}

  async getTransaction(transaction: TransactionDto) {
    const { key } = this.config.exchangeRateApi;
    const { from, to, amount } = transaction;
    const url = `/${key}/pair/${from}/${to}/${amount}`;

    try {
      const request = this.httpService.get<TransactionDto>(url);

      const { data } = await lastValueFrom(request);
      return data;
    } catch (error) {
      throw ExchangeApiErrorHandler.handleError(error);
    }
  }
}

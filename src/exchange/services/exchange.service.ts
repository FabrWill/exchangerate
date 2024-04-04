import { Injectable } from "@nestjs/common";
import { ExchangeDTO } from "../domain/dto/exchange.dto";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs";
import { ApplicationConfigService } from "@/config/application_config.service";

@Injectable()
export class ExchangeService {
    constructor(
        private httpService: HttpService,
        private config: ApplicationConfigService
    ) {}

    getExchange(from: string, to: string, amount: number) {
        const url = `/${this.config.exchangeRateApi.key}/pair/${from}/${to}/${amount}`;

        return this.httpService
            .get<ExchangeDTO>(url)
            .pipe(map((response) => response.data));
    }
}

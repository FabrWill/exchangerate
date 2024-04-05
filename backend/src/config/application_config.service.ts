import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DateTime } from "luxon";

@Injectable()
export class ApplicationConfigService {
  constructor(private config: ConfigService) {}

  get exchangeRateApi() {
    return {
      key: this.config.get("EXCHANGE_RATE_API_KEY"),
      url: this.config.get("EXCHANGE_RATE_BASE_URL"),
    };
  }

  get setting() {
    return {
      env: this.config.get("NODE_ENV"),
      port: this.config.get("APP_PORT"),
    };
  }

  get formatDate(): string {
    return "HH:mm dd/MM/yyyy";
  }

  /**
   * Cache TTL in seconds
   * exchange rate api free plan changes every days on 00:01 UTC
   * @returns number
   */
  get cacheTTL(): number {
    const now = DateTime.utc();
    const midnight = now.plus({ days: 1 }).set({ hour: 0, minute: 1, second: 0, millisecond: 0 });

    const results = midnight.diff(now, "seconds").seconds;
    return Math.ceil(results);
  }
}

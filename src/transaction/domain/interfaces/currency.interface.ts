export interface Currency {
  base_code: string;
  conversion_rates: Record<string, number>;
  last_update: string;
}

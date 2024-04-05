import { IsString, IsISO4217CurrencyCode, IsNotIn } from "class-validator";

export class CurrencyDTO {
  @IsString()
  @IsISO4217CurrencyCode({ message: "Código da Moeda inválido" })
  @IsNotIn(["XXX", "KPW"], { message: "Código da Moeda inválido" })
  currency: string;
}

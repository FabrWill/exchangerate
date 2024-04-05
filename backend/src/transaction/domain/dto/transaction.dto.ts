import { Transform } from "class-transformer";
import { IsString, IsISO4217CurrencyCode, IsNumber, IsPositive, IsNotIn } from "class-validator";

export class TransactionDto {
  @IsString()
  @IsISO4217CurrencyCode({ message: "Código da Moeda inválido" })
  @IsNotIn(["XXX", "KPW"], { message: "Código da Moeda inválido" })
  from: string;

  @IsString()
  @IsISO4217CurrencyCode({ message: "Código da Moeda inválido" })
  @IsNotIn(["XXX", "KPW"], { message: "Código da Moeda inválido" })
  to: string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  @IsPositive({ message: "Valor da transação inválido" })
  amount: number;
}

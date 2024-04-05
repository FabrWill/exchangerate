import { Controller, Get, Inject, Param } from "@nestjs/common";
import { TransactionService } from "../services/transaction.service";
import { TransactionDto } from "../domain/dto/transaction.dto";

@Controller("transaction")
export class TransactionController {
  constructor(@Inject(TransactionService) private transactionService: TransactionService) {}

  @Get(":from/:to/:amount")
  async getConversion(@Param() transaction: TransactionDto) {
    const data = this.transactionService.getTransaction(transaction);

    return data;
  }
}

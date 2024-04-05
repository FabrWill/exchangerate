import Rest from '@/http/services/Rest';
import Transaction from '../../domain/entity/transaction.entity';

export default class TransactionService extends Rest {
  static resource = 'transaction';

  static async loadTransaction(params: Transaction): Promise<Transaction> {
    return this.build().read(`${params.from}/${params.to}/${params.amount}`)
  }
}

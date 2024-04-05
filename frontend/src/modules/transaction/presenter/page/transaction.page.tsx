import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Background from '@/assets/images/background.svg';
import TransactionForm from '../components/transaction_form';
import Transaction from '../../domain/entity/transaction.entity';
import DebouncerHelper from '@/modules/shared/helpers/debouncer.helper';
import TransactionService from '../../infra/services/transaction.service';
import useConstructor from '@/modules/shared/patterns/Constructor';

let debouncer;

const TransactionPage: React.FC = () => {
  const form = useForm<Transaction>({ defaultValues: { ...new Transaction() } });

  const loadSchedules = form.handleSubmit(async () => {
    const { amount, from, to } = form.getValues();

    if (!amount || !from || !to) {
      form.setError('root.serverError', { message: 'Preencha todos os campos' });
      return;
    }

    const data = await TransactionService.loadTransaction(form.getValues());

    form.setValue('base_rate', data.base_rate);
    form.setValue('conversion_rate', data.conversion_rate);
    form.setValue('conversion_result', data.conversion_result);
    form.setValue('last_update', data.last_update);
  });

  useConstructor(() => {
    debouncer = DebouncerHelper.registerDebounce(loadSchedules, 1600);
  });

  const onFormChange = () => {
    form.clearErrors();

    debouncer();
  };

  return (
    <Box
      className={useColorModeValue('fc-white', 'fc-dark')}
      backgroundImage={Background}
      backgroundPosition="bottom"
      backgroundSize="cover"
      backgroundRepeat="repeat-x"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="calc(100vh - 60px)"
    >
      <TransactionForm form={form} onFormChange={onFormChange} />
    </Box>
  );
};

export default TransactionPage;

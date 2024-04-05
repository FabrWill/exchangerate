import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, useColorModeValue } from '@chakra-ui/react';
import useConstructor from '@/modules/shared/patterns/Constructor';
import Background from '@/assets/images/background.svg';
import TransactionForm from '../components/transaction_form';
import Transaction from '../../domain/entity/transaction.entity';

const TransactionPage: React.FC = () => {
  const form = useForm<Transaction>({ defaultValues: { ...new Transaction() } });

  // const loadSchedules = async () => {
  //   try {
  //     // form.loading = true;

  //     const schedules = await ScheduleService.build().index({});

  //     const serializedSchedules: Schedule[] = schedules.map((item) => ScheduleDTO.toSchedule(item));
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     // form.loading = false;
  //   }
  // };

  useConstructor(() => {
    // loadSchedules();
  });

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
      <TransactionForm form={form} />
    </Box>
  );
};

export default TransactionPage;

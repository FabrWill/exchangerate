import React from 'react';
import { Flex, FormControl, FormLabel, Input, Stack, Heading, Select } from '@chakra-ui/react';

import { Controller, UseFormReturn } from 'react-hook-form';
import Transaction from '../../domain/entity/transaction.entity';
import CurrencyAutocomplete from './currency_autocomplete';
import { ArrowRightIcon } from '@chakra-ui/icons';
import CurrencyInput from './currency_input';

interface Props {
  form: UseFormReturn<Transaction, any, undefined>;
}

const TransactionForm: React.FC<Props> = ({ form }) => {
  return (
    <Flex w="100%" justifyContent="center">
      <Stack py={3} px={0} spacing={2}>
        <Heading w="100%" fontWeight="normal" size={'lg'} mb="2%">
          Conversão
        </Heading>

        <Stack direction={['column', 'row']} spacing={2}>
          <FormControl id="from" flex={1} mr="1%" {...form.register('from')}>
            <FormLabel>Moeda de origem</FormLabel>

            <Controller
              name={'from'}
              control={form.control}
              render={({ field: { onChange, value } }) => <CurrencyAutocomplete onChange={onChange} value={value} />}
            />
          </FormControl>

          <FormControl id="name" flex={1} mr="1%">
            <FormLabel>Valor</FormLabel>
            <Controller
              name={'amount'}
              control={form.control}
              render={({ field: { onChange, value } }) => <CurrencyInput onChange={onChange} value={value} />}
            />
          </FormControl>

          <FormControl id="to" flex={1} mr="1%" {...form.register('to')}>
            <FormLabel>Moeda de destino?</FormLabel>

            <Controller
              name={'to'}
              control={form.control}
              render={({ field: { onChange, value } }) => <CurrencyAutocomplete onChange={onChange} value={value} />}
            />
          </FormControl>

          <ArrowRightIcon fontWeight="bold" textAlign="center" my="auto"/>

          <Heading fontWeight="bold" size={'lg'} textAlign="center" my="auto" lineHeight="0.5">
            2.34
          </Heading>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default TransactionForm;

import React from 'react';
import { Flex, FormControl, FormLabel, Stack, Heading, Spinner, Text } from '@chakra-ui/react';

import { Controller, UseFormReturn } from 'react-hook-form';
import Transaction from '../../domain/entity/transaction.entity';
import CurrencyAutocomplete from './currency_autocomplete';
import { ArrowRightIcon } from '@chakra-ui/icons';
import CurrencyInput from './currency_input';

interface Props {
  form: UseFormReturn<Transaction, any, undefined>;
  onFormChange: () => void;
}

const TransactionForm: React.FC<Props> = ({ form, onFormChange }) => {
  const formatCurrency = (number: number) => {
    const currency = form.watch('to') || 'BRL';

    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(number);
  };

  return (
    <Flex w="100%" justifyContent="center" marginTop="-164px">
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
              render={({ field: { onChange, value } }) => (
                <CurrencyAutocomplete
                  onChange={(value) => {
                    onChange(value);
                    onFormChange();
                  }}
                  value={value}
                />
              )}
            />
          </FormControl>

          <FormControl id="name" flex={1} mr="1%">
            <FormLabel>Valor</FormLabel>
            <Controller
              name={'amount'}
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <CurrencyInput
                  onChange={(value) => {
                    onChange(value);
                    onFormChange();
                  }}
                  value={value}
                />
              )}
            />
          </FormControl>

          <FormControl id="to" flex={1} mr="1%" {...form.register('to')}>
            <FormLabel>Moeda de destino?</FormLabel>

            <Controller
              name={'to'}
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <CurrencyAutocomplete
                  onChange={(value) => {
                    onChange(value);
                    onFormChange();
                  }}
                  value={value}
                />
              )}
            />
          </FormControl>

          <ArrowRightIcon fontWeight="bold" textAlign="center" my="auto" mx="20px" />

          <Stack my="auto" minH="24px" minW="24px">
            {form.formState.isSubmitting ? (
              <Spinner color="green.400" />
            ) : (
              <Heading fontWeight="bold" size={'lg'} textAlign="center" my="auto" lineHeight="0.5">
                {formatCurrency(form.watch('conversion_result') || 0)}
              </Heading>
            )}
          </Stack>
        </Stack>

        <Text fontSize="sm" color="red">
          {form.formState.errors.root?.serverError?.message ?? ''}
        </Text>
      </Stack>
    </Flex>
  );
};

export default TransactionForm;

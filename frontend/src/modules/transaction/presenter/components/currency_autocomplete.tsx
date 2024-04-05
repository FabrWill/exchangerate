import { useStore } from '@/modules/shared/patterns/Store';
import { Box, Flex, Select } from '@chakra-ui/react';

interface CurrencyAutocompleteDTO {
  loading: boolean;
  currencies: string[];
  error: string | null;
}

interface Props {
  onChange: (Currency) =>void;
  value?: string;
}

const CurrencyAutocomplete: React.FC<Props> = ({ onChange, value }) => {
  const store = useStore<CurrencyAutocompleteDTO>({
    loading: false,
    currencies: Intl.supportedValuesOf('currency'),
    error: null,
  });

  const handleChange = (event) => {
    const result = store.currencies.find((currency) => {
      return currency == event.target.value;
    });

    onChange(result);
  };
  

  return (
    <Flex gap={2} direction={'column'}>
      <Box w="100%">
        <Select onChange={handleChange} value={value}>
          {store.currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
      </Box>
    </Flex>
  );
};

export default CurrencyAutocomplete;

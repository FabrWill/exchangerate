import { NumberInput, NumberInputField } from '@chakra-ui/react';

interface Props {
  onChange: (value) => void;
  value?: number;
}

const CurrencyInput: React.FC<Props> = ({ onChange, value }) => {
  const precision = 2;
  const format = (valueAsNumber: number) => {
    if (!valueAsNumber) return;

    let valueAsString = valueAsNumber.toString();

    const [integerPart, decimalPart = ''] = valueAsString.split('.');

    if (decimalPart) {
      valueAsString = `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decimalPart.padEnd(precision, '0')}`;
    } else {
      valueAsString = `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${'0'.repeat(precision)}`;
    }

    return valueAsString;
  };

  const parse = (valueAsString: string) => {
    let valueAsNumber = 0;

    try {
      let parsedValueAsString = valueAsString.replace(/\D/g, '');

      parsedValueAsString = parsedValueAsString.padStart(precision + 1, '0');

      parsedValueAsString = `${parsedValueAsString.substring(
        0,
        parsedValueAsString.length - precision,
      )}.${parsedValueAsString.slice(precision * -1)}`;

      valueAsNumber = parseFloat(parsedValueAsString);
    } catch {
      valueAsNumber = 0;
    }

    return valueAsNumber;
  };

  return (
    <NumberInput
      value={format(value)}
      onChange={(valueAsString) => onChange(parse(valueAsString))}
      isValidCharacter={(character: string) => Boolean(character.match(/^[0-9]$/))}
    >
      <NumberInputField />
    </NumberInput>
  );
};

export default CurrencyInput;

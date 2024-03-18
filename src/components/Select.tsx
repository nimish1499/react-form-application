import React from 'react';
import {
  chakraComponents,
  Select as ChakraReactSelect,
  OptionProps,
  GroupBase,
  Props as ChakraReactSelectProps,
} from 'chakra-react-select';
import { CheckIcon } from '@chakra-ui/icons';
import { Box, HStack } from '@chakra-ui/react';

interface Option {
  value: string;
  label: string;
}

const SelectOption: React.FC<OptionProps<Option, false, GroupBase<Option>>> = (props) => {
  const { children, isSelected, ...rest } = props;
  return (
    <chakraComponents.Option {...rest} isSelected={isSelected}>
      <HStack justifyContent="space-between" width="full">
        <Box>{children}</Box>
        {isSelected && <CheckIcon color="green.500" />}
      </HStack>
    </chakraComponents.Option>
  );
};


interface SelectProps extends Omit<ChakraReactSelectProps<Option, false>, 'options' | 'onChange'> {
  options: Option[];
  onChange: (value: Option | null) => void;
}

const Select: React.FC<SelectProps> = ({ options, placeholder, onChange, value }) => {

  const selectedValue = options.find((option) => option.value === (value as Option)?.value) || null;

  return (
    <ChakraReactSelect<Option, false>
      options={options}
      placeholder={placeholder}
      value={selectedValue}
      onChange={(selected) => onChange(selected as Option | null)}
      components={{ Option: SelectOption }}
      chakraStyles={{
  input: (provided) => ({
    ...provided,
  }),
  control: (provided) => ({
    ...provided,
    
    backgroundColor: "#D7D7D7 !important",
  }),
  menuList: (provided) => ({
    ...provided,
    color: "#fff",
    backgroundColor: "#D7D7D7",
  }),
  option: (provided) => ({
    ...provided,
    color: "#fff",
    backgroundColor: "#D7D7D7 !important",
  }),
}}
    />
  );
};

export default Select;

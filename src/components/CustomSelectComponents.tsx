import { OptionProps } from 'chakra-react-select';
import { components } from 'react-select';
import { CheckIcon } from '@chakra-ui/icons';

export const CustomOption = (props: OptionProps<any, any, any>) => {
  return (
    <components.Option {...props}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {props.children}
        {props.isSelected && <CheckIcon color="green.500" />}
      </div>
    </components.Option>
  );
};

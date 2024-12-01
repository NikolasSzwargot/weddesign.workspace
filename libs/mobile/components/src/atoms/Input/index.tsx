import {
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TextInputProps,
} from 'react-native';
import {Colors} from '@weddesign/enums';
import {StyledInput} from './styles';

type InputProps = TextInputProps & {
    value: string;
    onChange: (val: string) => void;
};

//@TODO: Fix secure text content. Worst case we might need to use native import for it.
const Input = ({
    inputMode = 'text',
    placeholder = '',
    clearTextOnFocus = false,
    value,
    onChange,
    ...props
}: InputProps) => {
    const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        onChange(e.nativeEvent.text);
    };

    return (
        <StyledInput
            inputMode={inputMode}
            placeholder={placeholder}
            clearTextOnFocus={clearTextOnFocus}
            value={value}
            onChange={handleChange}
            placeholderTextColor={Colors.Gray}
            {...props}
        />
    );
};

export default Input;

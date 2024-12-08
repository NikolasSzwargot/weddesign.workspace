import {
    NativeSyntheticEvent,
    TextInputChangeEventData,
    TextInputProps,
} from 'react-native';
import {Colors} from '@weddesign/enums';
import {StyledInput} from './styles';

type InputProps = TextInputProps & {
    value: string;
    handleChange: (val: string) => void;
    multiline?: boolean
};

//@TODO: Fix secure text content. Worst case we might need to use native import for it.
const Input = ({
    inputMode = 'text',
    placeholder = '',
    clearTextOnFocus = false,
    handleChange,
    value,
                 multiline = false,
    ...props
}: InputProps) => {
    const changePropagator = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        handleChange(e.nativeEvent.text);
    };
    return (
        <StyledInput
            inputMode={inputMode}
            placeholder={placeholder}
            clearTextOnFocus={clearTextOnFocus}
            value={value}
            placeholderTextColor={Colors.Gray}
            onChange={changePropagator}
            {...props}
            multiline={multiline}
            placeholderTextColor={Colors.Gray}
            onChange={changePropagator}
            {...props}
        />
    );
};

export default Input;

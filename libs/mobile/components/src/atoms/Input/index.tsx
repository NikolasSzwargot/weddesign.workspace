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
    multiline?: boolean;
};
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
            multiline={multiline}
            placeholderTextColor={Colors.Gray}
            onChange={changePropagator}
            {...props}
        />
    );
};

export default Input;

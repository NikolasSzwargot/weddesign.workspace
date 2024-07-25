import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import {StyledInput} from './styles';

type InputProps = {
    placeholder?: string;
    inputMode?: 'none' | 'text' | 'email' | 'numeric';
    clearTextOnFocus?: boolean;
    value: string;
    onChange: (val: string) => void;
};

const Input = ({
    inputMode = 'none',
    placeholder = '',
    clearTextOnFocus = false,
    value,
    onChange,
}: InputProps) => {
    const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        onChange(e.nativeEvent.text);
    };
    return (
        <StyledInput
            inputMode={inputMode ?? 'none'}
            placeholder={placeholder ?? ''}
            clearTextOnFocus={clearTextOnFocus}
            value={value}
            onChange={(e) => {
                handleChange(e);
            }}
        />
    );
};

export default Input;

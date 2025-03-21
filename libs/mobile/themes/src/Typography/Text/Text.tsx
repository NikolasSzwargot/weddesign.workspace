import {TextStyle} from 'react-native';
import {Text as RNEText, TextProps} from 'react-native-elements';
import {typographyStyles} from './typegraphyStyles';

interface CustomTextProps extends TextProps {
    size?: number;
    style?: TextStyle | TextStyle[];
}

const Regular: React.FC<CustomTextProps> = ({
    children,
    size = 16,
    style,
    ...props
}) => (
    <RNEText style={[typographyStyles.regular, {fontSize: size}, style]} {...props}>
        {children}
    </RNEText>
);

export const Bold: React.FC<CustomTextProps> = ({
    children,
    size = 16,
    style,
    ...props
}) => (
    <RNEText style={[typographyStyles.bold, {fontSize: size}, style]} {...props}>
        {children}
    </RNEText>
);

export const Italic: React.FC<CustomTextProps> = ({
    children,
    size = 16,
    style,
    ...props
}) => (
    <RNEText style={[typographyStyles.italic, {fontSize: size}, style]} {...props}>
        {children}
    </RNEText>
);

export const SemiBold: React.FC<CustomTextProps> = ({
    children,
    size = 16,
    style,
    ...props
}) => (
    <RNEText style={[typographyStyles.semiBold, {fontSize: size}, style]} {...props}>
        {children}
    </RNEText>
);

export const Light: React.FC<CustomTextProps> = ({
    children,
    size = 16,
    style,
    ...props
}) => (
    <RNEText style={[typographyStyles.light, {fontSize: size}, style]} {...props}>
        {children}
    </RNEText>
);

const RegularGray: React.FC<CustomTextProps> = ({
    children,
    size = 16,
    style,
    ...props
}) => (
    <RNEText
        style={[typographyStyles.regularGray, {fontSize: size}, style]}
        {...props}
    >
        {children}
    </RNEText>
);

const RegularPink: React.FC<CustomTextProps> = ({
    children,
    size = 16,
    style,
    ...props
}) => (
    <RNEText
        style={[typographyStyles.regularPink, {fontSize: size}, style]}
        {...props}
    >
        {children}
    </RNEText>
);

const Error: React.FC<CustomTextProps> = ({
    children,
    size = 16,
    style,
    ...props
}) => (
    <RNEText style={[typographyStyles.error, {fontSize: size}, style]} {...props}>
        {children}
    </RNEText>
);

const Text = {
    Regular,
    Bold,
    Italic,
    SemiBold,
    Light,
    RegularGray,
    RegularPink,
    Error,
};

export default Text;

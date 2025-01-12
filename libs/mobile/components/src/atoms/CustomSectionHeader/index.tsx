import {
    EndSeparatorLine,
    LongSeparatorLine,
    MiddleSeparatorLine,
    StartSeparatorLine,
    UniversalSeparatorContainer,
} from './styles';

import {Text} from '@weddesign/themes';
import {Colors} from '@weddesign/enums';

type CustomSectionHeaderProps = {
    section: {
        title: string;
        subtitle?: string;
    };
    titlePrefix?: string;
    color?: Colors;
};

const CustomSectionHeader = ({
    section: {title, subtitle},
    titlePrefix,
    color = Colors.GraySection,
}: CustomSectionHeaderProps) => (
    <UniversalSeparatorContainer>
        <StartSeparatorLine color={color} />
        {titlePrefix && (
            <Text.RegularGray style={{color: color}}>{titlePrefix}</Text.RegularGray>
        )}
        <Text.RegularGray style={{color: color}}>{title}</Text.RegularGray>
        {subtitle ? (
            <>
                <MiddleSeparatorLine color={color} />
                <Text.RegularGray style={{color: color}}>
                    {subtitle}
                </Text.RegularGray>
                <EndSeparatorLine color={color} />
            </>
        ) : (
            <LongSeparatorLine color={color} />
        )}
    </UniversalSeparatorContainer>
);

export default CustomSectionHeader;

import {
    EndSeparatorLine,
    LongSeparatorLine,
    MiddleSeparatorLine,
    StartSeparatorLine,
    UniversalSeparatorContainer,
} from './styles';

import {Text} from '@weddesign/themes';

type CustomSectionHeaderProps = {
    section: {
        title: string;
        subtitle?: string;
    };
};

const CustomSectionHeader = ({
    section: {title, subtitle},
}: CustomSectionHeaderProps) => (
    <UniversalSeparatorContainer>
        <StartSeparatorLine />
        <Text.RegularGray>{title}</Text.RegularGray>
        {subtitle ? (
            <>
                <MiddleSeparatorLine />
                <Text.RegularGray>{subtitle}</Text.RegularGray>
                <EndSeparatorLine />
            </>
        ) : (
            <LongSeparatorLine />
        )}
    </UniversalSeparatorContainer>
);

export default CustomSectionHeader;

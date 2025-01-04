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
    titlePrefix?: string;
};

const CustomSectionHeader = ({
    section: {title, subtitle},
    titlePrefix,
}: CustomSectionHeaderProps) => (
    <UniversalSeparatorContainer>
        <StartSeparatorLine />
        {titlePrefix && <Text.RegularGray>{titlePrefix} </Text.RegularGray>}
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

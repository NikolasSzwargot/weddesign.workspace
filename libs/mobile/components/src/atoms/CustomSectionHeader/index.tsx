import {
    LongSeparatorLine,
    ShortSeparatorLine,
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
        <ShortSeparatorLine />
        <Text.RegularGray>{title}</Text.RegularGray>
        {subtitle && (
            <>
                <ShortSeparatorLine />
                <Text.RegularGray>{subtitle}</Text.RegularGray>
            </>
        )}
        <LongSeparatorLine />
    </UniversalSeparatorContainer>
);

export default CustomSectionHeader;

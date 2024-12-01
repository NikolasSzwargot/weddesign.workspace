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
        {/*TODO: dodać tłumacznie do nazw - teraz TYLKO do budzetu*/}
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

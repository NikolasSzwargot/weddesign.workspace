import {Colors} from '@weddesign/enums';
import {ProgressBarContainer, ProgressFill} from './styles';

type ProgressBarProps = {
    max?: number;
    progress: number;
    backgroundColor?: Colors;
    fillColor?: Colors;
};

const ProgressBar = ({
    max = 100,
    progress,
    backgroundColor = Colors.PinkLight,
    fillColor = Colors.Pink,
}: ProgressBarProps) => {
    const fillPercentage = (progress / max) * 100;

    return (
        <ProgressBarContainer backgroundColor={backgroundColor}>
            <ProgressFill fillPercentage={fillPercentage} fillColor={fillColor} />
        </ProgressBarContainer>
    );
};

export default ProgressBar;

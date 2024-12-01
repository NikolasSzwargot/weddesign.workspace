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
            <ProgressFill
                fillPercentage={Math.min(Math.max(0, fillPercentage), 100)}
                fillColor={fillColor}
            />
        </ProgressBarContainer>
    );
};

export default ProgressBar;

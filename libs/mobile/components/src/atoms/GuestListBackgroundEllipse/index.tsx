import {Ellipse} from './styles';
import {GradientColor} from '@weddesign/types';

type GuestListBackgroundEllipseProps = {
    colors?: GradientColor[];
    angle?: number;
};
const GuestListBackgroundEllipse = ({
    colors,
    angle,
}: GuestListBackgroundEllipseProps) => {
    return <Ellipse />;
};

export default GuestListBackgroundEllipse;

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
    // const defaultColors: GradientColor[] = [
    //     {offset: '100%', color: Colors.PinkDark, opacity: '1'},
    //     {offset: '100%', color: Colors.PinkLightest, opacity: '1'},
    // ];
    // return <Ellipse colorList={colors || defaultColors} angle={angle || 90} />;
    return <Ellipse />;
};

export default GuestListBackgroundEllipse;

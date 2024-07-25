import {Ellipse} from './styles';
import {GradientColor} from '@weddesign/types';

type BackgroundEllipseProps = {
    colors?: GradientColor[];
    angle?: number;
};
const BackgroundEllipse = ({colors, angle}: BackgroundEllipseProps) => {
    // const defaultColors: GradientColor[] = [
    //     {offset: '100%', color: Colors.PinkDark, opacity: '1'},
    //     {offset: '100%', color: Colors.PinkLightest, opacity: '1'},
    // ];
    // return <Ellipse colorList={colors || defaultColors} angle={angle || 90} />;
    return <Ellipse />;
};

export default BackgroundEllipse;

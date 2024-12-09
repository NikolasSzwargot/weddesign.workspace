import {Ellipse} from './styles';
import {GradientColor} from '@weddesign/types';

type BackgroundEllipseProps = {
    colors?: GradientColor[];
    angle?: number;
};
const BudgetEllipse = ({colors, angle}: BackgroundEllipseProps) => {
    return <Ellipse />;
};

export default BudgetEllipse;

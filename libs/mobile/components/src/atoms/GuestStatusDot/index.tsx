import {StatusDot} from './styles';

type GuestStatusDotProps = {status: number};

const GuestStatusDot = ({status}: GuestStatusDotProps) => (
    <StatusDot status={status} />
);

export default GuestStatusDot;

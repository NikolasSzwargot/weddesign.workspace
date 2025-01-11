import {Colors} from '@weddesign/enums';
import {getDaysDifference} from '@weddesign/utils';

export const getDeadlineColor = (deadline?: Date): Colors => {
    if (!deadline) {
        return Colors.DarkYellow;
    }
    const today = new Date();
    const deadlineDate = new Date(deadline);

    return getDaysDifference(today, deadlineDate) >= 0
        ? Colors.GraySection
        : Colors.StatusRejected;
};

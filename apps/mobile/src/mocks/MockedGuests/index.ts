import {Guest} from '@weddesign/types';

export const guestsData: Guest[] = [
    {
        firstName: 'Filip',
        lastName: 'Rosiak',
        isVege: false,
        isCompanion: false,
        isChild: false,
        canGetThere: true,
        statusId: 1,
        nocleg: true,
    },
    {
        firstName: 'Jakub',
        lastName: 'Stefański',
        isVege: false,
        isCompanion: false,
        isChild: true,
        canGetThere: true,
        statusId: 2,
        nocleg: false,
    },
    {
        firstName: 'Lena',
        lastName: 'Woźniak',
        isVege: false,
        isCompanion: true,
        isChild: false,
        canGetThere: false,
        statusId: 3,
        nocleg: true,
    },
    {
        firstName: 'Nikolas',
        lastName: 'Szwargot',
        isVege: true,
        isCompanion: false,
        isChild: false,
        canGetThere: true,
        statusId: 4,
        nocleg: false,
    },
];

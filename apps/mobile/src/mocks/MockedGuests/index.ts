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
    },
    {
        firstName: 'Jakub',
        lastName: 'Stefański',
        isVege: false,
        isCompanion: false,
        isChild: true,
        canGetThere: true,
        statusId: 2,
    },
    {
        firstName: 'Lena',
        lastName: 'Woźniak',
        isVege: false,
        isCompanion: true,
        isChild: false,
        canGetThere: false,
        statusId: 3,
    },
    {
        firstName: 'Nikolas',
        lastName: 'Szwargot',
        isVege: true,
        isCompanion: false,
        isChild: false,
        canGetThere: true,
        statusId: 4,
    },
];

type Guest = {
    id: number;
    firstName: string;
    lastName: string;
    isVege: boolean;
    isCompanion: boolean;
    isChild: boolean;
    canGetThere: boolean;
    statusId: number;
    nocleg: boolean;
};

export const groupGuestsByFirstLetter = (guests: Guest[]) => {
    const grouped = guests.reduce<{[key: string]: Guest[]}>((acc, guest) => {
        const firstLetter = guest.firstName.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(guest);
        return acc;
    }, {});

    return Object.keys(grouped)
        .sort()
        .map((letter) => ({
            title: letter,
            data: grouped[letter],
        }));
};

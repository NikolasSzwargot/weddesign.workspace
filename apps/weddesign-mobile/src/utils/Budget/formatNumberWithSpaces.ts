export const formatNumberWithSpaces = (num: number | string): string => {
    const stringified = typeof num === 'number' ? num.toString() : num;
    return stringified.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

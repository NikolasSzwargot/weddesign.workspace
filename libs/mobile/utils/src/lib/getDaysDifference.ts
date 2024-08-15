export const getDaysDifference = (begginingDate: Date, endingDate: Date): number => {
    const differenceInTime = endingDate.getTime() - begginingDate.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};

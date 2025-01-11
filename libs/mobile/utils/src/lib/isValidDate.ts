export const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // True if it's a valid date
};

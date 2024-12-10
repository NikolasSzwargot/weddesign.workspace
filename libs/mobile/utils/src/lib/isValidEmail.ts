export const isValidEmail = (email: string): boolean => {
    //@NOTE: Regex zgodny ze standardem RFC 5322 do sprawdzania maila
    const emailRegex =
        /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"(\\[\t -~]|[!#-[\]-~ \t])*")@([A-Z0-9]([-A-Z0-9]*[A-Z0-9])?(\.[A-Z0-9]([-A-Z0-9]*[A-Z0-9])?)*)/i;
    //@NOTE: 2 kropki sa niedozwolone w adresach email według standardu.
    if (email.includes('..')) {
        return false;
    }
    return emailRegex.test(email);
};

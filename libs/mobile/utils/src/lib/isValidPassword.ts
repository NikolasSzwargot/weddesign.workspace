export const isValidPassword = (password: string): boolean => {
    //@NOTE: Minimalna długość: 8 znaków
    //@NOTE: Co najmniej jedna mała litera, jedna duża litera i jedna cyfra
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
};

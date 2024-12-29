import {LoginDto, UserDto} from '@shared/dto';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useRouting} from '@mobile/components';
import {HomeRoutes} from '@weddesign/enums';

import {RegisterDto, useLogin} from '../../api';
import {useRegister} from '../../api';

type UserContextType = {
    user: UserDto | undefined | null;
    login: (data: LoginDto) => void;
    register: (data: RegisterDto) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    login: (data: LoginDto) => {},
    register: (data: RegisterDto) => {},
});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState<UserDto | undefined | null>(null);
    const {router} = useRouting();

    const {mutateAsync: mutateLogin} = useLogin();
    const {mutateAsync: mutateRegister} = useRegister();

    const login = async (data: LoginDto) => {
        const response = await mutateLogin(data);
        setUser(response);
    };

    const register = async (data: RegisterDto) => {
        const response = await mutateRegister(data);
        console.log(response);
        setUser(response);
    };

    useEffect(() => {
        if (user) {
            router.navigate(HomeRoutes.HOME);
        }
    }, [user]);

    const contextValues = useMemo(
        () => ({login, register, user}),
        [login, register, user],
    );

    return (
        <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

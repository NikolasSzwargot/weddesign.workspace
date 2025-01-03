import {LoginDto, UserDto} from '@shared/dto';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useRouting} from '@mobile/components';
import {HomeRoutes} from '@weddesign/enums';
// import {getFromCache, removeFromCache, saveToCache} from '@mobile/utils';

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

const USER_KEY = 'user_key' as const;

export const UserProvider = ({children}) => {
    const [user, setUser] = useState<UserDto | undefined | null>(null);
    const {router} = useRouting();

    const {mutateAsync: mutateLogin} = useLogin();
    const {mutateAsync: mutateRegister} = useRegister();

    const saveUserToStorage = async (user: UserDto | null) => {
        try {
            if (user) {
                // await saveToCache(USER_KEY, user);
            } else {
                // await removeFromCache(USER_KEY);
            }
        } catch (error) {
            console.error('Error saving user to storage', error);
        }
    };

    const loadUserFromStorage = async () => {
        // return getFromCache<UserDto>(USER_KEY);
        return null;
    };

    const login = async (data: LoginDto) => {
        try {
            const response = await mutateLogin(data);
            setUser(response);
            // await saveUserToStorage(response);
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (data: RegisterDto) => {
        try {
            const response = await mutateRegister(data);
            setUser(response);
            // await saveUserToStorage(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const initializeUser = async () => {
            // const storedUser = await loadUserFromStorage();
            // if (storedUser) {
            //     setUser(storedUser);
            // }
            loadUserFromStorage();
        };
        initializeUser();
    }, []);

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

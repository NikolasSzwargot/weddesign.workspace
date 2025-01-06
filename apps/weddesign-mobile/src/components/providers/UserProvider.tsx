import {LoginDto, UserDto} from '@shared/dto';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useRouting} from '@weddesign-mobile/components';
import {HomeRoutes} from '@weddesign/enums';
import {getFromCache, removeFromCache, saveToCache} from '@weddesign-mobile/utils';

import {RegisterDto, useLogin} from '../../api';
import {useRegister} from '../../api';

type UserContextType = {
    user: UserDto | undefined | null;
    login: (data: LoginDto) => void;
    register: (data: string) => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    login: (data: LoginDto) => {},
    register: (data: string) => {},
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
                await saveToCache(USER_KEY, user);
            } else {
                await removeFromCache(USER_KEY);
            }
        } catch (error) {
            console.error('Error saving user to storage', error);
        }
    };

    const loadUserFromStorage = async () => {
        return getFromCache<UserDto>(USER_KEY);
    };

    const login = async (data: LoginDto) => {
        try {
            const response = await mutateLogin(data);
            setUser(response);
            await saveUserToStorage(response);
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (data: RegisterDto) => {
        try {
            await mutateRegister(data);
            const userData = await mutateLogin({
                email: data.email,
                password: data.password,
            });
            setUser(userData);
            await saveUserToStorage(userData);

            router.navigate(HomeRoutes.HOME);
        } catch (error) {
            console.log(error.message());
        }
    };

    useEffect(() => {
        const initializeUser = async () => {
            const storedUser = await loadUserFromStorage();
            if (storedUser) {
                setUser(storedUser);
            }
            loadUserFromStorage();
        };
        initializeUser();
    }, []);

    useEffect(() => {
        if (user) {
            // router.navigate(HomeRoutes.HOME);
        }
    }, [user]);

    const contextValues = useMemo(
        () => ({
            login: login,
            register: register,
            user: user,
        }),
        [login, register, user],
    );

    return (
        <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

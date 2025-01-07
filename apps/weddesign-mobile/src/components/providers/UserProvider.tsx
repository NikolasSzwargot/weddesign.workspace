import {LoginDto, UserDto} from '@shared/dto';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {useRouting} from '@weddesign-mobile/components';
import {getFromCache, removeFromCache, saveToCache} from '@weddesign-mobile/utils';
import {fetchWrapper} from '@weddesign/api';
import {API_URL} from '@weddesign-mobile/config';
import {ApiRoutes, AppRootRoutes, ErrorRoutes, HomeRoutes} from '@weddesign/enums';

import {useRegister} from '../../api';
import {RegisterDto, useLogin} from '../../api';

type UserContextType = {
    user: UserDto | undefined | null;
    accessToken: AccessTokenDto | undefined | null;
    login: (data: LoginDto) => void;
    register: (data: RegisterDto) => void;
    onUnauthorized: () => void;
    onError: () => void;
};

export type AccessTokenDto = {
    access_token: string;
    expires_at: Date;
};

const UserContext = createContext<UserContextType>({
    user: null,
    accessToken: null,
    login: (data: LoginDto) => {},
    register: (data: RegisterDto) => {},
    onUnauthorized: () => {},
    onError: () => {},
});

const TOKEN_KEY = 'token_key' as const;

export const UserProvider = ({children}) => {
    const [token, setToken] = useState<AccessTokenDto>(null);
    const [user, setUser] = useState<UserDto | undefined | null>(null);
    const {router} = useRouting();

    const {mutateAsync: mutateLogin} = useLogin();
    const {mutateAsync: mutateRegister} = useRegister();

    const saveTokenToStorage = async (token: AccessTokenDto | null) => {
        try {
            if (token) {
                await saveToCache(TOKEN_KEY, token);
            } else {
                await removeFromCache(TOKEN_KEY);
            }
        } catch (error) {
            console.error('Error saving user to storage', error);
        }
    };

    const loadTokenFromStorage = async () => {
        return getFromCache<AccessTokenDto>(TOKEN_KEY);
    };

    const login = async (data: LoginDto) => {
        try {
            const response = await mutateLogin(data);
            setToken(response);
            await saveTokenToStorage(response);
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (data: RegisterDto) => {
        try {
            await mutateRegister(data);
            const accessToken = await mutateLogin({
                email: data.email,
                password: data.password,
            });
            setToken(accessToken);
            await saveTokenToStorage(accessToken);
        } catch (error) {
            console.log(error.message());
        }
    };

    const onUnauthorized = useCallback(() => {
        setToken(null);
        setUser(null);
        router.navigate(AppRootRoutes.LOGIN);
    }, [router]);

    const onError = useCallback(() => {
        router.navigate(ErrorRoutes.GENERAL);
    }, [router]);

    useEffect(() => {
        const initializeToken = async () => {
            const storedToken = await loadTokenFromStorage();
            if (storedToken) {
                const now = new Date();
                const expiresAt = new Date(storedToken.expires_at);

                if (expiresAt > now) {
                    setToken(storedToken);
                } else {
                    setToken(null);
                }
            }
        };
        initializeToken();
    }, []);

    useEffect(() => {
        const initializeUser = async () => {
            if (token) {
                const api = fetchWrapper(API_URL, () => token.access_token);
                try {
                    const profile = await api.GET<UserDto>(ApiRoutes.Profile);

                    if (profile) {
                        setUser(profile);
                        router.navigate(HomeRoutes.HOME);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        initializeUser();
    }, [token]);

    const contextValues = useMemo(
        () => ({
            login: login,
            register: register,
            user: user,
            accessToken: token,
            onUnauthorized: onUnauthorized,
            onError: onError,
        }),
        [login, register, user, token],
    );

    return (
        <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

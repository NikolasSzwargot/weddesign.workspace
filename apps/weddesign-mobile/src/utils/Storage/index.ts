import * as SecureStore from 'expo-secure-store';

export const saveToCache = async <T>(key: string, value: T): Promise<void> => {
    try {
        const stringValue = JSON.stringify(value);
        await SecureStore.setItemAsync(key, stringValue);
    } catch (error) {
        console.error(`Error saving ${key}:`, error);
    }
};

export const getFromCache = async <T>(key: string): Promise<T | null> => {
    try {
        const stringValue = await SecureStore.getItemAsync(key);
        if (stringValue === null) {
            return null;
        }
        return JSON.parse(stringValue) as T;
    } catch (error) {
        console.error(`Error retrieving ${key}:`, error);
        return null;
    }
};

export const removeFromCache = async (key: string): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.error(`Error removing ${key}:`, error);
    }
};

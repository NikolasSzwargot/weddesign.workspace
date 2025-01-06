import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const saveToCache = async <T>(key: string, value: T): Promise<void> => {
    try {
        const stringValue = JSON.stringify(value);
        storage.set(key, stringValue);
        console.log(`Saved ${key} to MMKV.`);
    } catch (error) {
        console.error(`Error saving ${key}:`, error);
    }
};

export const getFromCache = async <T>(key: string): Promise<T | null> => {
    try {
        const stringValue = storage.getString(key);
        if (stringValue === undefined) {
            console.log(`No value found for ${key} in MMKV.`);
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
        storage.delete(key);
        console.log(`Removed ${key} from MMKV.`);
    } catch (error) {
        console.error(`Error removing ${key}:`, error);
    }
};

import {Linking} from 'react-native';

const normalizeUrl = (input: string) => {
    if (input.startsWith('http://') || input.startsWith('https://')) {
        return input;
    }
    if (input.startsWith('www.')) {
        return `https://${input}`;
    }
    return `https://${input}`;
};

export const openWebsite = async (url: string) => {
    const normalizedUrl = normalizeUrl(url);

    try {
        await Linking.openURL(normalizedUrl);
    } catch (error) {
        console.log(error);
    }
};

export const openInstagram = async (url: string) => {
    let instagramUsername = '';

    if (url.startsWith('@')) {
        instagramUsername = url.substring(1);
    } else {
        const normalizedUrl = normalizeUrl(url);
        if (normalizedUrl.includes('instagram.com')) {
            instagramUsername = getInstagramUsername(normalizedUrl);
        }
    }

    if (instagramUsername) {
        const instagramDeepLink = `instagram://user?username=${instagramUsername}`;

        const canOpenApp = await Linking.canOpenURL(instagramDeepLink);
        if (canOpenApp) {
            await Linking.openURL(instagramDeepLink);
            return;
        }
    }

    try {
        await Linking.openURL(`https://instagram.com/${instagramUsername}`);
    } catch (error) {
        console.log(error);
    }
};

const getInstagramUsername = (url: string) => {
    const match = url.match(/instagram\.com\/([^/?#]+)/);
    return match ? match[1] : '';
};

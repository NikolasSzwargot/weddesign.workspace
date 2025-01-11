import {Colors} from '@weddesign/enums';

export const variantDefaults = {
    home: {
        rx: 280,
        ry: 100,
        gradientColors: [
            {offset: '20%', color: Colors.PinkLightest, opacity: 1},
            {offset: '100%', color: Colors.Pink, opacity: 1},
        ],
        angle: 180,
    },
    guests: {
        rx: 280,
        ry: 150,
        gradientColors: [
            {offset: '75%', color: Colors.White, opacity: 1},
            {offset: '100%', color: Colors.LightBlue, opacity: 1},
        ],
        angle: 90,
    },
    budget: {
        rx: 280,
        ry: 150,
        gradientColors: [
            {offset: '75%', color: Colors.White, opacity: 1},
            {offset: '100%', color: Colors.LightGreen, opacity: 1},
        ],
        angle: 90,
    },
    providers: {
        rx: 280,
        ry: 150,
        gradientColors: [
            {offset: '75%', color: Colors.White, opacity: 1},
            {offset: '100%', color: Colors.LightPurple, opacity: 1},
        ],
        angle: 90,
    },
    tasks: {
        rx: 280,
        ry: 150,
        gradientColors: [
            {offset: '75%', color: Colors.LightYellow, opacity: 1},
            {offset: '100%', color: Colors.DarkYellow, opacity: 1},
        ],
        angle: 90,
    },
};

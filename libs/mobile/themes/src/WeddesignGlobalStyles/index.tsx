import React, {ReactNode} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {Colors} from '@weddesign/enums';

type GlobalStylesProps = {
    children: ReactNode;
};

const WeddesignGlobalStyles: React.FC<GlobalStylesProps> = ({children}) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={null} />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        backgroundColor: Colors.White,
    },
});

export default WeddesignGlobalStyles;

import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 150px;
`;

export const LoginContainer = styled.KeyboardAvoidingView`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`;

export const ProgressLogoContainer = styled.View`
    top: 5%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
`;

export const styles = StyleSheet.create({
    textInput: {
        backgroundColor: Colors.White,
        borderColor: Colors.Gray,
        borderRadius: 8,
        borderWidth: 1,
        color: Colors.Black,
        fontSize: 16,
        paddingHorizontal: 15,
        paddingVertical: 10,
        textAlign: 'left',
        width: '100%',
    },
});

export const NextButtonContainer = styled.View`
    width: 95%;
    position: absolute;
    bottom: 15px;
    align-self: center;
`;

export const LabelContainer = styled.View`
    width: 100%;
    margin-top: 2%;
    display: flex;
    align-items: center;
`;

export const ContentComtainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const DescriptionContainer = styled.View`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const FormContainer = styled.View`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    gap: 12px;
`;

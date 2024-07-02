import React from 'react';
import styled from 'styled-components/native';

const StyledText = styled.Text`
    color: aqua;
`;

export const App = () => {
    return (
        <>
            <StyledText>{'styled text'}</StyledText>
        </>
    );
};
export default App;

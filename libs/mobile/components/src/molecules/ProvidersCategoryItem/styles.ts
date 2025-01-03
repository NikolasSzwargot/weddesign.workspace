import styled from 'styled-components/native';
import {Colors} from '@weddesign/enums';

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
    background-color: ${Colors.WhiteSmoke};
    align-items: center;
    border-radius: 15px;
    padding: 10px 30px 10px 10px;
    gap: 20px;
`;

export const ColumnTextContainer = styled.View`
    flex: 1;
    flex-direction: column;
    margin-right: 10px;
`;

export const RowTextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
`;

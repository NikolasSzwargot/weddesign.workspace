import React from 'react';
import SearchBar from 'react-native-platform-searchbar';
import {SearchBarContainer} from './styles';
import {Colors} from '@weddesign/enums';

type CustomSearchBarProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    placeholder: string;
};

const CustomSearchBar = ({
    searchQuery,
    setSearchQuery,
    placeholder,
}: CustomSearchBarProps) => {
    return (
        <SearchBarContainer>
            <SearchBar
                style={{
                    flex: 1,
                    height: 44,
                    borderColor: Colors.LightGray,
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                placeholder={placeholder}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </SearchBarContainer>
    );
};

export default CustomSearchBar;

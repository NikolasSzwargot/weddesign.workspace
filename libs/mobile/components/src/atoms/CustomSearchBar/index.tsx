import React from 'react';
import SearchBar from 'react-native-platform-searchbar';
import {SearchBarContainer} from './styles';

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
                style={{flex: 1, height: 44}}
                placeholder={placeholder}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </SearchBarContainer>
    );
};

export default CustomSearchBar;

import React from 'react';
import SearchBar from 'react-native-platform-searchbar';

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
        <SearchBar
            placeholder={placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
    );
};

export default CustomSearchBar;

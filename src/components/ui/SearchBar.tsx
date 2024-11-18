import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { debounce } from 'lodash';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = "Search posts..." }: SearchBarProps) {
    const [value, setValue] = useState('');

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            onSearch(query);
        }, 300),
        [onSearch]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        debouncedSearch(newValue);
    };

    return (
        <div className="relative w-full max-w-md">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
    );
}

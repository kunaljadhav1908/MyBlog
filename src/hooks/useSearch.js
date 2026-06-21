import { useState, useMemo } from 'react';

export default function useSearch(items, filterKeys = ['title']) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = useMemo(() => {
        if (!searchTerm || !Array.isArray(items)) return items;

        const lowerSearch = searchTerm.toLowerCase();

        return items.filter((item) => {
            return filterKeys.some((key) => {
                const value = item[key];
                return value && value.toString().toLowerCase().includes(lowerSearch);
            });
        });
    }, [items, searchTerm, JSON.stringify(filterKeys)]);

    return {
        searchTerm,
        setSearchTerm,
        filteredItems
    };
}

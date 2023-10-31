import { createContext, useState } from "react";
import { Results, AdvertiserDomains } from "../types";

const SearchContext = createContext<SearchContextType>({});

export function SearchProvider({ children }) {
    const [results, setResults] = useState<Results>({
        domain: 'NaN',
        time: 0,
        parseErrors: 0,
        advertiserDomains: [],
    })

    const [errors, setErrors] = useState([])
    const [pending, setPending] = useState<Boolean>(false)
    const [searchTerm, setSearchTerm] = useState<String>('');

    const parse = async (domain: String) => {
        setErrors([])
        setPending(true)

        await fetch(`/api/parse?domain=${domain}`)
        .then(async res => {
            if (! res.ok) {
                throw { message: res.statusText, code: res.status };
            }

            const json = await res.json()
            setResults(json)
        })
        .catch(e => {
            setErrors([e])
        }).finally(() => {
            setPending(false)
        })
    };

    const searchResults: AdvertiserDomains = results.advertiserDomains.filter(
        item => item.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <SearchContext.Provider value={{ results, setResults, parse, searchResults, searchTerm, setSearchTerm, errors, pending }}>
            { children }
        </SearchContext.Provider>
    )
}

export default SearchContext;
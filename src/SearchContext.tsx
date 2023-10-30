import { createContext, useState } from "react";

const SearchContext = createContext({});

export function SearchProvider({ children }) {
    const [results, setResults] = useState({
        domain: 'NaN',
        advertiserDomains: {},
        time: 0,
        parseErrors: 0,
    })

    const [errors, setErrors] = useState([])

    const parse = async (domain: String) => {
        setErrors([])

        await fetch('/api/test', {
            method: 'post',
            body: JSON.stringify({ search: domain }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async res => {
            if (! res.ok) {
                throw { message: res.statusText, code: res.status };
            }
            const json = await res.json()
            console.log(json)
            setResults(json)
        })
        .catch(e => {
            setErrors([e])
        })
    };

    return (
        <SearchContext.Provider value={{ results, setResults, parse, errors, setErrors }}>
            { children }
        </SearchContext.Provider>
    )
}

export default SearchContext;
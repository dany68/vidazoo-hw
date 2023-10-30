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
    const [pending, setPending] = useState(false)

    const parse = async (domain: String) => {
        setErrors([])
        setPending(true)

        await fetch('/api/parse', {
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
            setResults(json)
        })
        .catch(e => {
            setErrors([e])
        }).finally(() => {
            setPending(false)
        })
    };

    return (
        <SearchContext.Provider value={{ results, setResults, parse, errors, pending }}>
            { children }
        </SearchContext.Provider>
    )
}

export default SearchContext;
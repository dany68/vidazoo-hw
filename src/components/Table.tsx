import { useContext, useState } from "react"
import SearchContext from "../SearchContext"

export default function Table() {
    const { results, setResults, parse, searchResults, searchTerm } = useContext(SearchContext)
    const [sortOrder, setSortOrder] = useState('asc')

    const sort = (fn) => {
        const sortedData = Object.entries(results.advertiserDomains).sort(fn);
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
        setResults(prev => ({
            ...prev,
            advertiserDomains: Object.fromEntries(sortedData)
        }))
    };

    if (! Object.keys(results.advertiserDomains).length) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center text-center h-96">
                <h2 className="font-bold text-xl">Start a search in the top bar..</h2>
                <div className="divider w-96">OR select one below</div>
                <ul className="text-blue-800 text-center">
                    <li onClick={() => parse('msn.com')} className="clickable hover:bg-blue-100 w-48 rounded py-3">msn.com</li>
                    <li onClick={() => parse('cnn.com')} className="clickable hover:bg-blue-100 w-48 rounded py-3">cnn.com</li>
                    <li onClick={() => parse('vidazoo.com')} className="clickable hover:bg-blue-100 w-48 rounded py-3">vidazoo.com</li>
                </ul>
            </div>
        )
    }

    if (searchTerm.length && Object.keys(searchResults).length == 0) {
        return (
            <div className="flex flex-col gap-6 items-center justify-center h-96">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 256 256"><g fill="currentColor"><path d="M192 112a80 80 0 1 1-80-80a80 80 0 0 1 80 80Z" opacity=".2"/><path d="m229.66 218.34l-50.06-50.06a88.21 88.21 0 1 0-11.32 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72Z"/></g></svg>
                <div>No results</div>
            </div>
        )
    }

    return (
        <table className="w-full text-sm border-separate">
            <thead className="sticky top-[126px] md:top-[90px] z-10">
                <tr>
                    <th onClick={() => sort(([a], [b]) => sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a))} className="clickable pl-8">Domain</th>
                    <th onClick={() => sort(([,a], [,b]) => sortOrder === 'asc' ? b - a : a - b)} className="clickable w-1/3">Count</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(Object.keys(searchResults).length ? searchResults : results.advertiserDomains).map(([key, val]) => (
                    <tr className="hover:bg-gray-50" key={key}>
                        <td className="pl-8">{key}</td>
                        <td>{val}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
import { useContext, useState } from "react"
import SearchContext from "../SearchContext"

export default function Table() {
    const { results, setResults, parse } = useContext(SearchContext)
    const [sortOrder, setSortOrder] = useState('asc')

    const sort = (fn) => {
        const sortedData = Object.entries(results.advertiserDomains).sort(fn);
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
        setResults(prevResults => ({
            ...prevResults,
            advertiserDomains: Object.fromEntries(sortedData)
        }))
    };

    if (! Object.keys(results.advertiserDomains).length) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center h-96">
                <h2 className="font-bold text-xl">Start a search in the top bar..</h2>
                <div className="divider">OR select one below</div>
                <ul className="text-blue-800 text-center">
                    <li onClick={() => parse('msn.com')} className="clickable hover:bg-blue-100 w-48 rounded py-3">msn.com</li>
                    <li onClick={() => parse('cnn.com')} className="clickable hover:bg-blue-100 w-48 rounded py-3">cnn.com</li>
                    <li onClick={() => parse('vidazoo.com')} className="clickable hover:bg-blue-100 w-48 rounded py-3">vidazoo.com</li>
                </ul>
            </div>
        )
    }

    return (
        <table className="w-full text-sm border-separate">
            <thead className="sticky top-[90px] z-10">
                <tr>
                    <th onClick={() => sort(([a], [b]) => sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a))} className="clickable pl-8">Domain</th>
                    <th onClick={() => sort(([,a], [,b]) => sortOrder === 'asc' ? b - a : a - b)} className="clickable w-1/3">Count</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(results.advertiserDomains).map(([key, val]) => (
                    <tr className="hover:bg-gray-50" key={key}>
                        <td className="pl-8">{key}</td>
                        <td>{val}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
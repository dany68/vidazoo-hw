import { useContext } from "react";
import SearchContext from "../SearchContext";
import SearchBar from "./SearchBar";
import { downloadJSON } from './../../utils/downloadJSON';

export default function Header() {
    const { results, setResults, setSearchTerm, searchResults } = useContext(SearchContext)

    function initResults() {
        setResults({
            domain: 'N/D',
            time: 0,
            parseErrors: 0,
            advertiserDomains: [],
        })
        window.scrollTo(0, 0);
    }

    function downloadResults() {
        if (! results.advertiserDomains.length) {
            return alert('No results available for download. Please search an another domain.');
        }
        downloadJSON(results, `${results.domain}.json`)
    }

    return (
        <header className="fixed top-0 left-0 right-0 pt-3 space-y-3 bg-[#161617cc]/90 backdrop-blur-sm text-white border-b-2 border-black/60">
            <div className="container grid grid-cols-2 md:grid-cols-5 gap-2 gap-y-3 items-center">
                <h1 onClick={initResults} className="clickable font-bold hover:text-blue-200">Ads.txt Crawler</h1>
                <div className="col-span-2 max-md:order-2 md:col-span-3 relative"><SearchBar /></div>
                <div className="text-right max-md:order-1 max-md:text-xs">
                    <button onClick={downloadResults} className="bg-blue-300 text-blue-800 rounded-full px-3 py-1">Download</button>
                </div>
            </div>
            <div className="overflow-scroll pb-3 max-md:px-5">
                <div className="container grid grid-cols-6 md:grid-cols-5 !min-w-[800px] items-center text-center text-xs text-zinc-400">
                    <div>Domain: <b>{results.domain}</b></div>
                    <div>Total advertisers: <b>{results.advertiserDomains.length}</b></div>
                    <div>Parse time: <b>{results.time}ms</b></div>
                    <div>Parse errors: <b>{results.parseErrors}</b></div>
                    <div className="relative flex items-center gap-2 max-md:-order-1 max-md:col-span-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><g fill="currentColor"><path d="M192 112a80 80 0 1 1-80-80a80 80 0 0 1 80 80Z" opacity=".2"/><path d="m229.66 218.34l-50.06-50.06a88.21 88.21 0 1 0-11.32 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72Z"/></g></svg>
                        <input onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent" type="text" placeholder="Search in results..." />
                        <div className="absolute top-0 right-1 text-white font-bold">{searchResults.length}</div>
                    </div>
                </div>
            </div>
        </header>
    )
}
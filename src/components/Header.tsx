import { useContext } from "react";
import SearchContext from "../SearchContext";
import SearchBar from "./SearchBar";
import { downloadJSON } from './../../utils/downloadJSON';

export default function Header() {
    const { results, setSearchTerm, searchResults } = useContext(SearchContext)

    return (
        <header className="fixed top-0 left-0 right-0 py-3 space-y-3 bg-[#161617cc]/90 backdrop-blur-sm text-white border-b-2 border-black/60">
            <div className="container grid grid-cols-5 items-center">
                <h1 className="font-bold">Ads.txt Crawler</h1>
                <div className="col-span-3 relative"><SearchBar /></div>
                <div className="text-right">
                    <button onClick={() => downloadJSON(results.advertiserDomains, `${results.domain}.json`)} className="bg-blue-300 text-blue-800 rounded-full px-3 py-1">Download</button>
                </div>
            </div>
            <div className="container grid grid-cols-5 items-center text-center text-xs text-zinc-400">
                <div>Domain: <b>{results.domain}</b></div>
                <div>Total advertisers: <b>{Object.keys(results.advertiserDomains).length}</b></div>
                <div>Parse time: <b>{results.time}ms</b></div>
                <div>Parse errors: <b>{results.parseErrors}</b></div>
                <div className="relative flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256"><g fill="currentColor"><path d="M192 112a80 80 0 1 1-80-80a80 80 0 0 1 80 80Z" opacity=".2"/><path d="m229.66 218.34l-50.06-50.06a88.21 88.21 0 1 0-11.32 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72Z"/></g></svg>
                    <input onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent" type="text" placeholder="Search in results..." />
                    <div className="absolute top-0 right-1 text-white font-bold">{Object.keys(searchResults).length}</div>
                </div>
            </div>
        </header>
    )
}
import { SearchProvider } from "./SearchContext";
import Header from "./components/Header";
import Table from "./components/Table";

export default function App() {
    return (
    <>
        <SearchProvider>
            <Header />
            <main className="container pt-40 pb-20">
                <div className="rounded-lg bg-white border-2">
                    <Table />
                </div>
            </main>
        </SearchProvider>

        <footer className="text-center pb-32">
            <div className="flex items-center justify-center mb-10 font-bold text-sm space-x-2">
                <a href="https://github.com/dany68/vidazoo-hw" target="_blank">Github Repo</a>
                <span>•</span>
                <a href="https://dany.work" target="_blank">Portfolio Website</a>
            </div>
            <p className="text-zinc-600">Developed with <span className="text-red-400 animate-pulse">&hearts;</span> by Daniel Elmalem<br /> For a Vidazoo Assignement</p>
        </footer>
    </>
    )
}
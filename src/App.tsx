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

        <footer className="text-center text-zinc-500 pb-32">
            <p>Developed with <span className="text-red-400 animate-pulse">&hearts;</span> by Daniel Elmalem<br /> For a Vidazoo Assignement</p>
        </footer>
    </>
    )
}
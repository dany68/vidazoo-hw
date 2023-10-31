export interface Results {
    domain: string;
    time: number;
    advertiserDomains: AdvertiserDomains;
    parseErrors: number;
}

export type AdvertiserDomains = Array<{ domain: string; count: number }>;

export interface SearchContextType {
    results: Results,
    parse: () => Promise<Results>,
    searchTerm: string,
    setSearchTerm: (term: string) => void;
    searchResults: (term: string) => void;
    pending: boolean
    // setResults, parse, searchResults, searchTerm, setSearchTerm, errors, pending
}
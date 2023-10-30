export interface Results {
    domain: string,
    time: string,
    advertiserDomains: AdvertiserDomains,
    parseErrors: number,
}

export interface AdvertiserDomains {
    [key: string]: number;
}
import { Results } from "../types";

const EMPTY_LINE = /^\s*$/;
const NEW_LINE = /\r\n|\n|\r/;
const COMMENT_LINE = /^\s*#/;
export const VALID_DOMAIN = /^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/;

/**
 * Parse ads.txt data
 */
export const parseAdsTxt = (fileText: string, domain: string): Promise<Results> => {
    return new Promise((resolve, reject) => {
        try {
            const t0 = performance.now();
            const lines = fileText.split(NEW_LINE);
            const advertiserDomains = {};
            let parseErrors = 0;

            lines.forEach(line => {
                if (COMMENT_LINE.test(line) || EMPTY_LINE.test(line)) {
                    return;
                }

                const [domain, ...otherFields] = line.split(',').map(field => field.trim().toLowerCase());

                // Specifications for ads.txt requires at least 3 fields:
                // the domain name, the publisher's account ID, and the account type
                // The code can be improve to check the format of the account ID and type
                if (otherFields.length < 2 || ! VALID_DOMAIN.test(domain) || otherFields.some(field => field === '')) {
                    parseErrors++;
                    return;
                }

                advertiserDomains[domain] = (advertiserDomains[domain] || 0) + 1;
            });

            const t1 = performance.now();

            resolve({
                domain,
                time: Math.floor((t1 - t0)*100),
                parseErrors,
                advertiserDomains,
            });
        } catch (err) {
            console.error('Error reading the file:', err);
            reject({});
        }
    });
}
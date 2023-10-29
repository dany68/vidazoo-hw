const EMPTY_LINE = /^\s*$/;
const NEW_LINE = /\r\n|\n|\r/;
const COMMENT_LINE = /^\s*#/;
const VALID_DOMAIN = /^(?:(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/;

/**
 * Parse ads.txt data
 */
export const parseAdsTxt = (fileText) => {
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

                const domain = line.split(',')[0].trim();

                if (! VALID_DOMAIN.test(domain)) {
                    parseErrors++;
                    return;
                }

                advertiserDomains[domain] = (advertiserDomains[domain] || 0) + 1;
            });

            const t1 = performance.now();

            resolve({
                advertiserDomains,
                time: (t1 - t0).toFixed(2),
                parseErrors,
            });
        } catch (err) {
            console.error('Error reading the file:', err);
            reject({});
        }
    });
}
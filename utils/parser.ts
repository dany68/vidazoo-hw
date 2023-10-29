const EMPTY_LINE = /^\s*$/;
const NEW_LINE = /\r\n|\n|\r/;
const COMMENT_LINE = /^\s*#/;

/**
 * Parse ads.txt data
 */
export const parseAdsTxt = (fileText) => {
    return new Promise((resolve, reject) => {
        try {
            const lines = fileText.split(NEW_LINE);
            const advertiserDomains = {};

            lines.forEach(line => {
                if (COMMENT_LINE.test(line) || EMPTY_LINE.test(line)) {
                    return;
                }

                const domain = line.split(',')[0].trim();

                advertiserDomains[domain] = (advertiserDomains[domain] || 0) + 1;
            });

            resolve(advertiserDomains);
        } catch (err) {
            console.error('Error reading the file:', err);
            reject({});
        }
    });
}
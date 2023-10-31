import express from "express"
import apicache from 'apicache'
import { parseAdsTxt, VALID_DOMAIN } from "../utils/parser";
import { Results } from "../types";

const app = express()
const port = process.env['PORT'] || 3002;
const cache = apicache.middleware('5 minutes');

app.get('/api/parse', cache, async ({ query: {domain} }, res) => {
    try {
        // We can improve the code with a prepareForValidation() method in the client side
        // to format the search query to allow more flexibility.
        // For instance, it could account for scenarios where the user enters 'https://'.
        // Also possible to validate in client side to avoid pinging the server.
        // But in any case validation must be performed server side also.
        validate(domain)

        const response = await fetch(`https://${domain}/ads.txt`);

        if (! response.ok) {
            throw { message: 'Failed to retrieve the Ads.txt file.', code: response.status };
        }

        const text = await response.text();
        const results: Results = await parseAdsTxt(text, domain)

        res.json(results);
    } catch (error) {
        console.error('An error occured with the fetch operation:', error);
        if (error.code) {
            return res.status(error.code).send(error.message);
        }
        res.status(500).send('Error fetching the file');
    }
})

app.use(express.static(process.cwd() + '/dist'))
app.listen(port, () => console.log(`Node/Express server started on port ${port}`))


function validate(str: string) {
    if (! str.length || ! VALID_DOMAIN.test(str)) {
        throw { message: 'Validation failed', code: 400 };
    }
}
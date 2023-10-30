import express from "express"
import { parseAdsTxt, VALID_DOMAIN } from "../utils/parser";
import { Results } from "../types";

const app = express()

app.use(express.json())

app.post('/api/parse', async ({ body: {search} }, res) => {
    try {        
        validate(search)

        const response = await fetch(`https://${search}/ads.txt`);

        if (! response.ok) {
            throw { message: 'Failed to retrieve the Ads.txt file.', code: response.status };
        }

        const text = await response.text();
        const results: Results = await parseAdsTxt(text)
        results.domain = search

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
app.listen(3002, () => console.log('Node/Express server started'))


function validate(str: string) {
    if (! str.length || ! VALID_DOMAIN.test(str)) {
        throw { message: 'Validation failed', code: 400 };
    }
}
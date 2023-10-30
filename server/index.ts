import express from "express"
import { parseAdsTxt } from "../utils/parser";

const app = express()

app.use(express.json())

app.post('/api/parse', async (req, res) => {

    // TODO: Validate posted data

    try {
        const fileUrl = `https://${req.body.search}/ads.txt`;

        const response = await fetch(fileUrl);

        if (! response.ok) {
            throw new Error('Network response was not ok');
        }

        const text = await response.text();
        const result = await parseAdsTxt(text)
        result.domain = req.body.search

        console.log(result)

        res.json(result);
    } catch (error) {
        console.error('An error occured with the fetch operation:', error);
        res.status(500).send('Error fetching the file');
    }
})

app.listen(3002, () => console.log('Node/Express server started'))
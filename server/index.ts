import express from "express"
import { parseAdsTxt } from "../utils/parser";

const app = express()

app.get('/api/test', async (req, res) => {
    try {
        // const fileUrl = 'https://www.bbc.com/ads.txt'; // Replace with the URL of the file you want to fetch
        const fileUrl = 'https://msn.com/ads.txt'; // Replace with the URL of the file you want to fetch

        const response = await fetch(fileUrl);

        if (! response.ok) {
            throw new Error('Network response was not ok');
        }

        const text = await response.text();
        const result = await parseAdsTxt(text)

        console.log(result)

        res.json(result);
    } catch (error) {
        console.error('An error occured with the fetch operation:', error);
        res.status(500).send('Error fetching the file');
    }
})

app.listen(3002, () => console.log('Node/Express server started'))
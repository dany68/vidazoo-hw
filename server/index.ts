import express from "express"

const app = express()

app.get('/api/test', async (req, res) => {
    try {
        const fileUrl = 'https://www.msn.com/ads.txt'; // Replace with the URL of the file you want to fetch

        const response = await fetch(fileUrl);

        if (! response.ok) {
            throw new Error('Network response was not ok');
        }

        const text = await response.text();
        console.log(text);

        res.send(text);
    } catch (error) {
        console.error('An error occured with the fetch operation:', error);
        res.status(500).send('Error fetching the file');
    }
})

app.listen(3002, () => console.log('Node/Express server started 1'))
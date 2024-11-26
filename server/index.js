const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/news', async (req, res) => {
    const { country, category, page, pageSize } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country,
                category,
                page,
                pageSize,
                apiKey,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

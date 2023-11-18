import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        let cryptoArray = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT',
        'SOLUSDT', 'DOTUSDT', 'LUNAUSDT']
        // ADD YOUR CRYPTO PAIR HERE
        let cryptoData = [];
        for (let i = 0; i<cryptoArray.length; i++) {
            const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${cryptoArray[i]}`);
            cryptoData.push(response.data)
        }
        res.render('index.ejs', { content: cryptoData });
        console.log(cryptoData)
    } catch (error) {
        console.error('Failed to make request', error.message);
        res.render('index.ejs');
    };
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});
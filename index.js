import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = 'https://api.blockchain.com/v3/exchange/';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}tickers`);
        let cryptoData = [];
        const btcData = result.data.filter(item => item.symbol ===('BTC-USD'));
        const ethData = result.data.filter(item => item.symbol ===('ETH-USD'));
        cryptoData.push(btcData, ethData)
        res.render('index.ejs', { content: cryptoData });
        console.log(cryptoData)
    } catch (errogr) {
        console.error('Failed to make request', error.message);
        res.render('index.ejs');
    };
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});
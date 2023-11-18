import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let cryptoArray = ['BTC', 'ETH', 'BNB', 'XRP',
'SOL', 'DOT', 'LUNA']

app.get('/', async (req, res) => {
    try {
        let cryptoData = [];
        for (let i = 0; i<cryptoArray.length; i++) {
            const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${cryptoArray[i].toUpperCase()}USDT`);
            cryptoData.push(response.data)
        }
        res.render('index.ejs', { content: cryptoData });
    } catch (error) {
        console.error('Failed to make request', error.message);
        res.render('index.ejs');
    };
});

app.post('/getCrypto', async (req, res) => {
    try {
        const token = req.body.tokenName
        await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${token.toUpperCase()}USDT`);
        cryptoArray.push(token);
        res.redirect('/')
    } catch (error) {
        console.error('Error:', error.message);
        res.redirect('/')
    }
})

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});
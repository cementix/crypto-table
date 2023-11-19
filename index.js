import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const BINANCE_URL = 'https://api.binance.com/api/v3/ticker/24hr'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let cryptoArray = ['BTC', 'ETH', 'BNB', 'XRP',
'SOL', 'DOT', 'LUNA'];

let addMessage = false;

app.get('/', async (req, res) => {
    try {
        let cryptoData = [];
        for (let i = 0; i < cryptoArray.length; i++) {
            const response = await axios.get(`${BINANCE_URL}?symbol=${cryptoArray[i].toUpperCase()}USDT`);
            cryptoData.push(response.data)
        }
        res.render('index.ejs', { 
            content: cryptoData,
            message: addMessage
        });
    } catch (error) {
        console.error('Failed to make request', error.message);
        res.render('index.ejs');
    };
});

app.post('/getCrypto', async (req, res) => {
    try {
        const token = req.body.tokenName
        await axios.get(`${BINANCE_URL}?symbol=${token.toUpperCase()}USDT`);
        cryptoArray.push(token);
        addMessage = 'Token succesfully aded to table!';
        res.redirect('/');
    } catch (error) {
        console.error('Error:', error.message);
        res.redirect('/');
        addMessage = 'Failed to find your token!';
    }
})

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});
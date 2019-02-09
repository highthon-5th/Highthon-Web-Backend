import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '1gb',
    extended: false
}));

app.use(express.session({
    key: 'sid', // 세션키
    secret: 'secret', // 비밀키
    cookie: {
        maxAge: 1000 * 60 * 60 * 1 // 쿠키 유효기간 1시간
    }
}));

//module setting
// import { Users, Hackathons } from './mongo';
app.get('/test', function(req, res) {
    console.log(req.body);
});

//서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('server running');
});
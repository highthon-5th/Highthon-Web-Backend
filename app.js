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
import { Users, Groups, Boards, Comments } from './mongo';

//서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('server running');
});

// require('./routes/auth/auth')(app);
// require('./routes/auth/modifyProfile')(app);
// require('./routes/auth/viewProfile')(app);
// require('./routes/board/setBoard')(app);
// require('./routes/board/viewBoard')(app);
// require('./routes/comment/addComment')(app);
// require('./routes/comment/delComment')(app);
// require('./routes/group/joinGroup')(app);
// require('./routes/group/leaveGroup')(app);
// require('./routes/group/setGroup')(app);
// require('./routes/group/viewGroup')(app);
// require('./routes/search/index')(app);
require('./routes/index')(app);
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import rndstring from 'randomstring'

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '1gb',
    extended: false
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
require('./routes/group/setGroup')(app, Users, Groups);
require('./routes/group/viewGroup')(app, Users, Groups, Boards);
// require('./routes/search/index')(app);
require('./routes/index')(app);
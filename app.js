import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '1gb',
    extended: false
}));

// set the secret key
app.set('jwt-secret', config.secret)

//module setting
import { Users, Groups, Boards, Comments } from './mongo';

//서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('server running');
});

require('./routes/auth/auth')(app);
// require('./routes/auth/viewProfile')(app);
require('./routes/board/setBoard')(app, Users, Groups, Boards);
require('./routes/board/viewBoard')(app, Users, Boards);
require('./routes/comment/addComment')(app, Users, Boards, Comments);
require('./routes/comment/delComment')(app, Users, Boards, Comments); //이건 안씀!
require('./routes/group/joinGroup')(app, Users, Groups);
require('./routes/group/leaveGroup')(app, Users, Groups);
require('./routes/group/setGroup')(app, Users, Groups);
require('./routes/group/viewGroup')(app, Users, Groups, Boards);
// require('./routes/search/index')(app);
require('./routes/index')(app);
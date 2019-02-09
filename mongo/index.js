import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/highthon5', { useNewUrlParser: true }).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() { console.log("Mongo On"); });

let UserSchema = mongoose.Schema({ //회원
    token: { type: String }, // 토큰
    image: { type: String }, //프로필 사진
    name: { type: String }, //이름
    email: { type: String }, //이메일(아이디)
    passwd: { type: String }, //비밀번호
    interest_main: { type: String }, // 주 관심사
    interest_sub: { type: String } // 보조 관심사
});

let GroupSchema = mongoose.Schema({ //그룹
    token: { type: String }, // 토큰
    name: { type: String }, //그룹이름
    introduction: { type: String }, //소개
    date: { type: Date, default: Date.now }, //생성 날짜
    members: [{
            token: { type: String } // 토큰
        }] //멤버 토큰
});

let BoardSchema = mongoose.Schema({ //게시판
    token: { type: String }, // 토큰
    title: { type: String }, // 제목
    content: { type: String }, // 내용
    date: { type: Date, default: Date.now }, //수정 날짜
    images: [{
        id: { type: String }, //id
        url: { type: String } //url
    }], //그룹 사진
    comments: [{
            token: { type: String } // 토큰
        }] //댓글 토큰
});

let CommentSchema = mongoose.Schema({ //댓글
    token: { type: String }, // 토큰
    comment: { type: String }, // 댓글
    user: { type: String }, // 쓴 사람
    date: { type: Date, default: Date.now } //수정 날짜
});


require('./err')(UserSchema, GroupSchema, BoardSchema, CommentSchema);

let Users = mongoose.model("users", UserSchema);
let Groups = mongoose.model("groups", GroupSchema);
let Boards = mongoose.model("boards", BoardSchema);
let Comments = mongoose.model("commets", CommentSchema);

export { Users, Groups, Boards, Comments };

export default db;
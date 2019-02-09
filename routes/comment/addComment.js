import rndstring from 'randomstring'

module.exports = (app, Users, Boards, Comments) => {
        app.post('/addComments', async(req, res) => {
            let comment = req.body;
            comment.token = rndstring.generate(25);
            let board_token = req.body.board_token;
            Boards.findOne({ token: board_token }, (err, rawContent) => {
                if (err) throw err;
                rawContent.comments.unshift(comment);
                rawContent.save((err) => {
                    if (err) throw err;
                });
            });

            return res.status(200).send('add comment success!');
        })
    }
    //그룹 이름, 유저가 참여한 여부, 멤버, 멤버수, 소개, 게시물
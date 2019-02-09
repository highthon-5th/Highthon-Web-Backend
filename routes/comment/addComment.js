import rndstring from 'randomstring'
import jwt from 'jsonwebtoken';
module.exports = (app, Users, Boards, Comments) => {
        app.post('/addComments', async(req, res) => {
            // let user_token = req.body.user_token;
            let board_token = req.body.board_token;

            const token = req.body.token
                // token does not exist
            if (!token) {
                return res.status(403).json({
                    success: false,
                    message: 'not logged in'
                })
            }

            // create a promise that decodes the token
            const p = new Promise(
                (resolve, reject) => {
                    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                        if (err) reject(err)
                        resolve(decoded)
                    })
                }
            )

            // if token is valid, it will respond with its info
            const respond = (token) => {
                let comment = new Comments(req.body);
                comment.token = rndstring.generate(25);
                comment.email = token.email;
                Boards.findOne({ token: board_token }, (err, rawContent) => {
                    if (err) throw err;
                    rawContent.comments.unshift(comment);
                    rawContent.save((err) => {
                        if (err) throw err;
                    });
                });

                return res.status(200).send('add comment success!');
                // res.json({
                //     success: true,
                //     info: token
                // })
            }

            // if it has failed to verify, it will return an error message
            const onError = (error) => {
                res.status(403).json({
                    success: false,
                    message: error.message
                })
            }

            // process the promise
            p.then(respond).catch(onError)

        })
    }
    //그룹 이름, 유저가 참여한 여부, 멤버, 멤버수, 소개, 게시물
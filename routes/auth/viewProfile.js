import rndstring from 'randomstring'
import jwt from 'jsonwebtoken';
module.exports = (app, Users, Groups) => {
        app.get('/viewProfile', async(req, res) => {
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
            const respond = async(token) => {
                //프로필 이름, 관심 분야, 그룹 목록
                await Users.findOne({ email: token.email }, async(err, rawContent) => {
                    if (err) throw err;
                    console.log(rawContent.joined_groups)
                        // let groups = await Groups.find({
                        //     'token': { $in: rawContent.joined_groups.token }
                        // }, function(err, docs) {
                        //     // console.log(docs);
                        // });
                        // console.log(groups)
                        // rawContent.joined_groups = groups;

                    return res.status(200).json(rawContent);
                });
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
    //프로필 이름, 관심 분야, 그룹 목록

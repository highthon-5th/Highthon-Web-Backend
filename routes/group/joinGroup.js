import jwt from 'jsonwebtoken';
module.exports = (app, Users, Groups) => {
        app.post('/joinGroup', async(req, res) => {
                // let user_token = req.body.user_token;
                let group_token = req.body.group_token;

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

                    Users.findOne({ email: token.email }, (err, rawContent) => {
                        if (err) throw err;

                        rawContent.joined_groups.unshift({ token: group_token });
                        rawContent.save(function(err) {
                            if (err) throw err;
                        });
                    });

                    return res.status(200).send('join group success!');
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
            .post('/aaUsers', async(req, res) => {
                var result = await Users.find()
                res.status(200).json(result)
            })
            .post('/delUsers', async(req, res) => {
                Users.remove({}, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.end('success');
                    }
                });
            })
    }
    //그룹 이름, 유저가 참여한 여부, 멤버, 멤버수, 소개, 게시물
module.exports = (app, Users, Groups) => {
        app.post('/joinGroup', async(req, res) => {
                let user_token = req.body.user_token;
                Groups.findOne({ token: req.body.group_token }, (err, rawContent) => {
                    if (err) throw err;

                    rawContent.members.unshift({ token: user_token });
                    rawContent.save(function(err) {
                        if (err) throw err;
                    });
                });

                return res.status(200).send('join group success!');
            })
            .post('/aaUser', async(req, res) => {
                var result = await Users.find()
                res.status(200).json(result)
            })
            .post('/delUser', async(req, res) => {
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
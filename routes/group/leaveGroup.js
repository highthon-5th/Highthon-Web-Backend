module.exports = (app, Users, Groups) => {
        app.post('/leaveGroup', async(req, res) => {
            let user_token = req.body.user_token;
            let group_token = req.body.group_token;
            Groups.updateOne({ 'token': group_token }, { $pull: { members: { token: user_token } } },
                function(err, res) {
                    if (err) console.log(err);
                });

            return res.status(200).send('leave group success!');
        })
    }
    //그룹 이름, 유저가 참여한 여부, 멤버, 멤버수, 소개, 게시물
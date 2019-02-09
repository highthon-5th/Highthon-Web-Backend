module.exports = (app, Users, Groups, Boards) => {
        app.post('/viewGroup', async(req, res) => {
            let result = await Groups.findOne({ token: req.body.token })
            if (!result) return res.status(404).json({ message: "Group Not Found" })
            let boards = Boards.find({
                'token': { $in: result.boards }
            }, function(err, docs) {
                console.log(docs);
            });
            let member_num = result.members.length;
            let data = {
                token: result.token,
                name: result.token,
                //   joined : result.name,
                members: result.members,
                member_num: member_num, //멤버수
                introduction: result.introduction,
                boards: boards,
            }
            return res.status(200).json({ result: result });
        })
    }
    //그룹 이름, 유저가 참여한 여부, 멤버, 멤버수, 소개, 게시물
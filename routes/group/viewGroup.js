module.exports = (app, Users, Groups, Boards) => {
        app.post('/viewGroup', async(req, res) => {
            let result = await Groups.findOne({ token: req.body.token })
            if (!result) return res.status(404).json({ message: "Group Not Found" })

            var data = result;

            let boards = Boards.find({
                'token': { $in: result.boards }
            }, function(err, docs) {
                console.log(docs);
            });
            data.boards = boards;
            data.member_num = result.members.length //멤버수
            console.log(data.member_num);
            // data.joined = member_num //참여여부
            return res.status(200).json(data);
        })
    }
    //그룹 이름, 유저가 참여한 여부, 멤버, 멤버수, 소개, 게시물
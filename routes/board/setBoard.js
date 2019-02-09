import rndstring from 'randomstring'

module.exports = (app, Users, Groups, Boards) => {
    app.post('/setBoard', async(req, res) => {
            let board = new Boards(req.body);
            board.token = rndstring.generate(25);
            try {
                var result = await board.save();
            } catch (e) {
                if (e instanceof user_duplicate) return res.status(409).json({ message: "already exist" });
                if (e instanceof ValidationError) return res.status(400).json({ message: e.message });
                if (e instanceof paramsError) return res.status(400).json({ message: e.message });
            }
            res.status(200).json(board);
        })
        .post('/aaBoard', async(req, res) => {
            var result = await Boards.find()
            res.status(200).json(result)
        })
        .post('/delBoard', async(req, res) => {
            Boards.remove({}, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.end('success');
                }
            });
        })
}
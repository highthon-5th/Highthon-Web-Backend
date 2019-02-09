import rndstring from 'randomstring'

module.exports = (app, Users, Groups) => {
    app.post('/setGroup', async(req, res) => {
            let group = new Groups(req.body);
            group.token = rndstring.generate(25);
            try {
                var result = await group.save();
            } catch (e) {
                if (e instanceof user_duplicate) return res.status(409).json({ message: "already exist" });
                if (e instanceof ValidationError) return res.status(400).json({ message: e.message });
                if (e instanceof paramsError) return res.status(400).json({ message: e.message });
            }
            res.status(200).json(group);
        })
        .post('/aaGroup', async(req, res) => {
            var result = await Groups.find()
            res.status(200).json(result)
        })
        .post('/delGroup', async(req, res) => {
            Groups.remove({}, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.end('success');
                }
            });
        })
}
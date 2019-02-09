import rndstring from 'randomstring'
import jwt from 'jsonwebtoken';
module.exports = (app, Users, Groups) => {
    app.post('/setGroup', async(req, res) => {
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
                let group = new Groups(req.body);
                group.email = token.email;
                group.token = rndstring.generate(25);
                try {
                    var result = await group.save();
                } catch (e) {
                    if (e instanceof user_duplicate) return res.status(409).json({ message: "already exist" });
                    if (e instanceof ValidationError) return res.status(400).json({ message: e.message });
                    if (e instanceof paramsError) return res.status(400).json({ message: e.message });
                }
                res.status(200).json(group);
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
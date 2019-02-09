import jwt from 'jsonwebtoken';
module.exports = (app, Users, Groups) => {
    app.post('/leaveGroup', async(req, res) => {
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

            Users.updateOne({ email: token.email }, { $pull: { joined_groups: { token: group_token } } },
                function(err, res) {
                    if (err) console.log('2' + err);
                });

            return res.status(200).send('leave group success!');
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
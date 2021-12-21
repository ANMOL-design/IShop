const jwt = require('jsonwebtoken');
const User = require('./../../Model/userschema');

const Authentication = async(req, res, next) => {
    try {
        const token = req.cookies.jwtToken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token ": token });

        if (!rootUser) { throw new Error('error occured') }

        req.token = token;
        req.rootUser = rootUser;
        req.UserId = rootUser._id;
        next();

    } catch (err) {
        res.status(401).send("Unauthorized: NO TOKEN PROVIDED")
        console.log(err);

    }

}
module.exports = Authentication;
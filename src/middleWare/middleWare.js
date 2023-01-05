const jwt= require("jsonwebtoken")


const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];

        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "group-18-key");

        req.decodedToken = decodedToken
        if (!decodedToken) return res.status(400).send({ status: false, msg: "token is invalid" });
        else {

            next()
        }
    }
    catch(err){
        res.status(500).send({msg:err.message})
    }
}


const authorization = (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ status: false, msg: "the header token is required." });
        }
        let decoded = jwt.verify(token, "group-18-key");
        if (!decoded) {
            return res.
            status(401).send({ status: false, msg: "Invalid token id." });
        }
        if (decoded.userId != req.params.userId) {
            return res.
            status(403).send({ status: false, msg: "The loggdin user is not authorized." });
        }
        next();
    } catch (err) {
        res.status(500).send({ msg: "Error", Error: err.message });
    }
}

module.exports.authorization=authorization
module.exports.authentication=authentication
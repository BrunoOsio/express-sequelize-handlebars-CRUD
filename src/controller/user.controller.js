const formidable = require("formidable");
const bcrypt = require("bcryptjs");

const userService = require("../service/user.service");
const { isSessionExists, setSessionLogin, setSessionEmail, destroySession } = require("../helper/session/sessionLogin.helper");

const BCRYPT_SALT_ROUNDS = 10;

exports.register = (req, res) => {
    new formidable
    .IncomingForm()
    .parse(req, (err, fields) => {
        
        const email = fields['email'];

        const rawPassword = fields['password'];
        bcrypt.hash(rawPassword, BCRYPT_SALT_ROUNDS, function(err, hashedPassword) {

            if (err) throw err;

            userService.register(email, hashedPassword);

            res.redirect("/login");
        });
    });
}

exports.login = (req, res) => {
    
    if (isSessionExists(req.session)) {
        return res.redirect("/");
    }

    new formidable
    .IncomingForm()
    .parse(req, (err, fields) => {
        const email = fields['email'];
        const password = fields['password'];

            const isLogged = userService.login(email, password);

            setSessionLogin(req.session, isLogged);

            if (isLogged) {
                setSessionEmail(req.session, email);
            }
        
            res.redirect("/");
    });
}

exports.logout = (req, res) => {

    if (!req.session.loggedin) {
       return res.status(401).send({message: "User not logged in"});
    }

    destroySession(req.session);

    return res.redirect("/");
}

exports.findAll = async (req, res) => {
    const data = await userService.findAll();

    res.send(data); 
}

exports.deleteAll = async (req, res) => {
    await userService.deleteAll();

    res.status(200).send({message: "All users deleted"});
}

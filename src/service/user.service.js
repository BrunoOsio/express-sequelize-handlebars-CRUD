const User = require("../model/user.model");
const bcrypt = require("bcryptjs");

exports.register = (email, password) => {

    try {
        User.create({email, password});
    } catch (error) {
        console.error(error);
    }
}

exports.login = async (email, rawPassword) => {
    try {

        const user = await User.findOne({where: {email}});
        const hashedPassword = user.password;

        bcrypt.compare(rawPassword, hashedPassword, function(err, isMatch) {

            if (err) throw err;

            return isMatch;
        });

    } catch (error) {
        console.error(error);
    }
}

exports.findAll = async (email, password) => {
    try {
        const data = await User.findAll();

        return data;

    } catch (error) {
        console.error(error);
    }
}

exports.deleteAll = async () => {
    try {
        await User.destroy({where: {}});

    } catch (error) {
        console.error(error);
    }
}